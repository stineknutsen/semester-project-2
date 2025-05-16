import { renderProfileBids } from "../../ui/listings/renderProfileBids.js";
import { getToken, getUsername } from "../../utils/localStorage.js";
import { displayMessage } from "../../utils/displayMessage.js";
import { showLoader, hideLoader } from "../../utils/loader.js";
import { fetchListings } from "../../api/listings/fetchListings.js";

export async function displayProfileBids(container) {
  const listingsContainer = document.getElementById("profile-listings");
  const username = getUsername();
  const token = getToken();

  if (!listingsContainer || !username || !token) {
    return;
  }

  try {
    showLoader("profile-listings-loader");
    const allListings = await fetchListings();

    if (!Array.isArray(allListings)) {
      throw new Error("Failed to fetch listings");
    }

    const userBids = allListings.filter((listing) =>
      listing.bids?.some((bid) => bid.bidder.name === username)
    );

    renderProfileBids(container, userBids);

    hideLoader("profile-listings-loader");
  } catch (error) {
    hideLoader();
    displayMessage(listingsContainer, "error", error.message);
  }
}
