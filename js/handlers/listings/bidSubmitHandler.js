import { displayMessage } from "../../utils/displayMessage.js";
import { getPostIdFromUrl } from "../../utils/getPostIdFromUrl.js";
import { showLoader, hideLoader } from "../../utils/loader.js";
import { getUsername } from "../../utils/localStorage.js";
import { bidOnListing } from "../../api/listings/bidOnListing.js";

export function bidSubmitHandler() {
  const form = document.getElementById("place-bid-form");
  if (!form) {
    return;
  }

  const messageContainer = document.getElementById("listing-message");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const listingId = getPostIdFromUrl();

    const amount = Number(form.amount.value.trim());

    const loggedInUser = getUsername();

    const highestBidElement = document.querySelector("#highestBidDisplay");
    const highestBid = Number(highestBidElement?.dataset.amount || 0);

    const seller = document.querySelector("#listing-seller").dataset.seller;

    if (loggedInUser === seller) {
      alert("You cannot bid on your own auction.");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    if (amount <= highestBid) {
      alert(
        `Your bid must be higher than the current highest bid ($${highestBid}).`
      );
      return;
    }

    try {
      showLoader("listing-loader");
      await bidOnListing(listingId, { amount });
      hideLoader("listing-loader");
      displayMessage(
        messageContainer,
        "success",
        "Bid placed successfully! Reloading..."
      );
      setTimeout(() => {
        form.reset();
        location.reload();
      }, 1500);
    } catch (error) {
      hideLoader("listing-loader");
      if (Array.isArray(error)) {
        displayMessage(messageContainer, "error", error);
      } else {
        displayMessage(
          messageContainer,
          "error",
          error.message || "Failed to place bid"
        );
      }
    }
  });
}
