export function renderProfile(profileData, container) {
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className =
    "flex flex-col max-w-[1200px] mt-8 shadow-md rounded-md overflow-hidden";

  const bannerWrapper = document.createElement("div");
  bannerWrapper.className = "relative max-h-[280px] overflow-hidden";

  const banner = document.createElement("img");
  banner.src =
    profileData.banner?.url || "https://via.placeholder.com/1200x300";
  banner.alt = profileData.banner?.alt || "Profile banner";
  banner.className = "object-cover w-full";

  const editBtn = document.createElement("button");
  editBtn.id = "edit-profile-btn";
  editBtn.textContent = "Edit Profile";
  editBtn.className =
    "absolute top-4 right-4 bg-light text-dark border border-dark font-poppins text-sm rounded-md px-4 py-2 shadow hover:scale-105 transition duration-200 z-10";

  const profileSection = document.createElement("div");
  profileSection.className = "flex justify-between p-4 items-end";

  const avatar = document.createElement("img");
  avatar.src = profileData.avatar?.url || "https://via.placeholder.com/150";
  avatar.alt = profileData.avatar?.alt || "Profile avatar";
  avatar.className = "w-16 h-16 md:w-24 md:h-24 rounded-full ";

  const infoWrapper = document.createElement("div");
  infoWrapper.className = " ";

  const name = document.createElement("h2");
  name.textContent = profileData.name;
  name.className = "text-xl font-semibold";

  const email = document.createElement("p");
  email.textContent = profileData.email;
  email.className = "text-sm ";

  const bio = document.createElement("p");
  bio.textContent = profileData.bio || "Edit profile to add your bio";
  bio.className = "text-sm mt-2";

  const credits = document.createElement("p");
  credits.textContent = `Credits: ${profileData.credits}`;
  credits.className = "text-sm mt-2";

  const profileWrapper = document.createElement("div");
  profileWrapper.className = "flex gap-4 items-center";

  bannerWrapper.append(banner, editBtn);
  infoWrapper.append(name, email, bio);
  profileWrapper.append(avatar, infoWrapper);
  profileSection.append(profileWrapper, credits);
  wrapper.append(bannerWrapper, profileSection);
  container.append(wrapper);
}
