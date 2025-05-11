import { fetchProfile } from "../../api/profile/fetchProfile.js";
import { renderProfile } from "../../ui/profile/renderProfile.js";
import { getUsername } from "../../utils/localStorage.js";

export async function displayProfile() {
  const container = document.getElementById("profile-header");
  const username = getUsername();
  console.log(username);

  if (!username) {
    container.textContent = "Log in to see profile.";
    location.href = "/account/login.html";
    return;
  }

  try {
    const profileData = await fetchProfile(username);
    renderProfile(profileData, container);
  } catch (error) {
    console.error("Profile fetch failed:", error);
    container.textContent = "Unable to load profile.";
  }
}
