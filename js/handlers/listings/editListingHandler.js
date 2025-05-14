import { fetchListingById } from "../../api/listings/fetchListingById.js";
import { populateEditListingForm } from "../../ui/listings/populateEditListingForm.js";
import { editListing } from "../../api/listings/editListing.js";
import { deleteListing } from "../../api/listings/deleteListing.js";
import { displayMessage } from "../../utils/displayMessage.js";
import { hideLoader, showLoader } from "../../utils/loader.js";

export function editListingHandler() {
  const form = document.getElementById("edit-listing-form");
  const cancelBtn = document.getElementById("edit-listing-cancel");
  const deleteBtn = document.getElementById("edit-listing-delete");
  const messageContainer = document.getElementById("edit-listing-message");

  document.addEventListener("click", async (event) => {
    if (event.target.matches('[data-action="edit"]')) {
      const id = event.target.dataset.id;
      try {
        const listing = await fetchListingById(id);
        populateEditListingForm(listing);

        document.getElementById("profile-listings").classList.add("hidden");
        document
          .getElementById("edit-profile-listings")
          .classList.remove("hidden");
      } catch (error) {
        console.error("Failed to load listing:", error);
      }
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = form.dataset.id;
    const updatedListing = {
      title: form.title.value.trim(),
      description: form.description.value.trim(),
      tags: form.tags.value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      media: [
        {
          url: form.imageUrl.value.trim(),
          alt: form.imageAlt.value.trim(),
        },
      ],
      endsAt: new Date(form.endDate.value).toISOString(),
    };

    try {
      showLoader("edit-listing-loader");
      await editListing(id, updatedListing);
      hideLoader("edit-listing-loader");
      displayMessage(
        messageContainer,
        "success",
        "Listing updated successfully!"
      );
      setTimeout(() => {
        location.reload();
      }, 1500);
      window.location.reload();
    } catch (error) {
      hideLoader("create-listing-loader");
      displayMessage(messageContainer, "error", error);
      throw error;
    }
  });
  console.log("yes queen");

  cancelBtn.addEventListener("click", () => {
    document.getElementById("edit-profile-listings").classList.add("hidden");
    document.getElementById("profile-listings").classList.remove("hidden");
  });

  deleteBtn.addEventListener("click", async () => {
    const id = form.dataset.id;
    if (confirm("Are you sure you want to delete this listing?")) {
      try {
        showLoader("edit-listing-loader");
        await deleteListing(id);
        hideLoader("edit-listing-loader");
        displayMessage(
          messageContainer,
          "success",
          "Listing deleted successfully!"
        );
        setTimeout(() => {
          location.reload();
        }, 1500);
      } catch (error) {
        hideLoader("edit-listing-loader");
        displayMessage(messageContainer, "error", error);
      }
    }
  });
}
