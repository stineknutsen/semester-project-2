import { editProfileHandler } from "../../handlers/profile/editProfileHandler.js";
import { fetchProfile } from "../../api/profile/fetchProfile.js";
import { renderProfile } from "../../ui/profile/renderProfile.js";
import { showLoader, hideLoader } from "../../utils/loader.js";
import { getUsername } from "../../utils/localStorage.js";
import { displayProfileListings } from "../../handlers/listings/displayProfileListings.js";
import { profileMenuHandler } from "./profileMenuHandler.js";

export async function displayProfile() {
  const headerContainer = document.getElementById("profile-header");
  const username = getUsername();

  if (!username) {
    headerContainer.textContent = "Log in to see profile.";
    location.href = "/account/login.html";
    return;
  }
  showLoader("profile-loader");
  try {
    const profileData = await fetchProfile(username);
    renderProfile(profileData, headerContainer);
    editProfileHandler(profileData);
    profileMenuHandler();
    displayProfileListings();
    hideLoader("profile-loader");
  } catch (error) {
    console.error("Profile fetch failed:", error);
    container.textContent = "Unable to load profile.";
  }
}
