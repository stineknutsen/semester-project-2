import { fetchListingById } from "../../api/listings/fetchListingById.js";
import { renderSingleListing } from "../../ui/listings/renderSingleListing.js";
import { getPostIdFromUrl } from "../../utils/getPostIdFromUrl.js";
import { showLoader, hideLoader } from "../../utils/loader.js";
import { displayMessage } from "../../utils/displayMessage.js";
import { bidSubmitHandler } from "./bidSubmitHandler.js";

export async function displaySingleListing() {
  const listingContainer = document.getElementById("listing-container");
  const listingMessageContainer = document.getElementById("listing-message");
  const postId = getPostIdFromUrl();

  try {
    showLoader("listing-loader");
    const listing = await fetchListingById(postId);
    renderSingleListing(listingContainer, listing);
    bidSubmitHandler();
    hideLoader("listing-loader");
  } catch (error) {
    hideLoader("listing-loader");
    displayMessage(listingMessageContainer, "error", error.message);
  }
}
