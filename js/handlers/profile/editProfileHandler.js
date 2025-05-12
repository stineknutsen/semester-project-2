import { editProfile } from "../../api/profile/editProfile.js";
import { showLoader, hideLoader } from "../../utils/loader.js";

export function editProfileHandler(profileData) {
  const formSection = document.getElementById("edit-profile-form");
  const form = document.getElementById("profile-form");
  const editBtn = document.getElementById("edit-profile-btn");
  const cancelBtn = document.getElementById("edit-profile-cancel");

  if (!formSection || !form || !editBtn) return;

  editBtn.addEventListener("click", () => {
    formSection.classList.toggle("hidden");
    form.elements.avatarUrl.value = profileData.avatar.url;
    form.elements.avatarAlt.value = profileData.avatar.alt;
    form.elements.bannerUrl.value = profileData.banner.url;
    form.elements.bannerAlt.value = profileData.banner.alt;
    form.elements.bio.value = profileData.bio || "Edit profile to add your bio";
  });

  cancelBtn.addEventListener("click", () => {
    formSection.classList.add("hidden");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoader("edit-profile-loader");

    const updatedProfile = {
      avatar: {
        url: form.elements.avatarUrl.value,
        alt: form.elements.avatarAlt.value,
      },
      banner: {
        url: form.elements.bannerUrl.value,
        alt: form.elements.bannerAlt.value,
      },
      bio: form.elements.bio.value,
    };

    try {
      await editProfile(updatedProfile);
      hideLoader("edit-profile-loader");
      alert("Profile updated successfully!");
      location.reload();
    } catch (err) {
      alert("Failed to update profile.");
    }
  });
}
