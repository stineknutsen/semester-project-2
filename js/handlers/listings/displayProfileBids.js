import { renderProfileBids } from "../../ui/listings/renderProfileBids.js";
import { getToken, getUsername } from "../../utils/localStorage.js";
import { displayMessage } from "../../utils/displayMessage.js";
import { showLoader, hideLoader } from "../../utils/loader.js";
import { fetchBids } from "../../api/listings/fetchBids.js";

export async function displayProfileBids() {
  const listingsContainer = document.getElementById("profile-listings");

  try {
    showLoader("profile-listings-loader");
    const bids = await fetchBids();
    renderProfileBids(listingsContainer, bids);
    hideLoader("profile-listings-loader");
  } catch (error) {
    hideLoader("profile-listings-loader");
    displayMessage(listingsContainer, "error", error.message);
  }
}
