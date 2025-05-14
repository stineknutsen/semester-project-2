import { fetchListings } from "../../api/listings/fetchListings.js";
import { renderFeedListings } from "../../ui/listings/renderFeedListings.js";
import { displayMessage } from "../../utils/displayMessage.js";
import { showLoader, hideLoader } from "../../utils/loader.js";

export async function displayFeedListings() {
  const listingsContainer = document.getElementById("feed-listings");

  if (!listingsContainer) {
    return;
  }

  try {
    showLoader("feed-listings-loader");
    const listings = await fetchListings();
    renderFeedListings(listingsContainer, listings);
    hideLoader("feed-listings-loader");
  } catch (error) {
    hideLoader("feed-listings-loader");
    displayMessage(listingsContainer, "error", error.message);
  }
}
