export function toggleMenu() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        menu.classList.add("hidden");
      }
    });
  }
}
