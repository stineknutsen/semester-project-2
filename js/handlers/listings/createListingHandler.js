import { displayMessage } from "../../utils/displayMessage.js";
import { hideLoader, showLoader } from "../../utils/loader.js";
import { createListing } from "../../api/listings/createListing.js";
import { getToken } from "../../utils/localStorage.js";

export function createListingHandler() {
  const createListingButtons = document.querySelectorAll(".create-listing-btn");
  const formContainer = document.getElementById("create-listing-form");
  const form = document.getElementById("listing-form");
  const messageContainer = document.getElementById("message-container");
  const cancelBtn = document.getElementById("cancel-btn");

  if (createListingButtons) {
    createListingButtons.forEach((button) => {
      button.addEventListener("click", () => {
        formContainer.classList.remove("hidden");
        formContainer.classList.add("flex");
      });
    });
  }

  if (!form) {
    return;
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      formContainer.classList.add("hidden");
      form.reset();
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const listing = {
      title: data.title.trim(),
      description: data.description.trim(),
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      media: [
        {
          url: data.imageUrl.trim(),
          alt: data.imageAlt.trim(),
        },
      ],
      endsAt: new Date(data.endDate).toISOString(),
    };

    const token = getToken();

    if (!token) {
      throw new Error("Log in to create listing");
    }

    try {
      showLoader("create-listing-loader");
      await createListing(listing, token);
      hideLoader("create-listing-loader");
      displayMessage(
        messageContainer,
        "success",
        "Listing created successfully!"
      );
      setTimeout(() => {
        form.reset();
        form.classList.add("hidden");
        location.reload();
      }, 1500);
    } catch (error) {
      hideLoader("create-listing-loader");
      displayMessage(messageContainer, "error", error);
      throw error;
    }
  });
}
