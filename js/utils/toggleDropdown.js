export function toggleDropdown() {
  const phoneBtn = document.getElementById("profile-btn-phone");
  const desktopBtn = document.getElementById("profile-btn-desktop");
  const dropdown = document.getElementById("dropdown");

  if (phoneBtn && dropdown) {
    phoneBtn.addEventListener("click", () => {
      dropdown.classList.toggle("hidden");
    });
  }
  if (desktopBtn && dropdown) {
    desktopBtn.addEventListener("click", () => {
      dropdown.classList.toggle("hidden");
    });
  }
}
