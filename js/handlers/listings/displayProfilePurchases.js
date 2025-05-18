import { renderProfilePurchases } from "../../ui/listings/renderProfilePurchases.js";
import { showLoader, hideLoader } from "../../utils/loader.js";
import { displayMessage } from "../../utils/displayMessage.js";
import { fetchWinnings } from "../../api/listings/fetchWinnings.js";

export async function displayProfilePurchases() {
  const listingsContainer = document.getElementById("profile-listings");

  try {
    showLoader("profile-listings-loader");
    const winnings = await fetchWinnings();
    renderProfilePurchases(listingsContainer, winnings);
    hideLoader("profile-listings-loader");
  } catch (error) {
    hideLoader("profile-listings-loader");
    displayMessage(listingsContainer, "error", error.message);
  }
}
