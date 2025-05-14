import { renderProfileListings } from "../../ui/listings/renderProfileListings.js";
import { displayMessage } from "../../utils/displayMessage.js";
import { showLoader, hideLoader } from "../../utils/loader.js";
import { fetchLoggedInUserListings } from "../../api/listings/fetchLoggedInUserListings.js";

export async function displayProfileListings() {
  const listingsContainer = document.getElementById("profile-listings");

  if (!listingsContainer) {
    return;
  }

  try {
    showLoader("profile-listings-loader");
    const listings = await fetchLoggedInUserListings();
    renderProfileListings(listingsContainer, listings);
    hideLoader("profile-listings-loader");
  } catch (error) {
    hideLoader();
    displayMessage(listingsContainer, "error", error.message);
  }
}
