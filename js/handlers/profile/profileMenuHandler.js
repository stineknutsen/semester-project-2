export function profileMenuHandler() {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selectedTab = tab.dataset.tab;

      tabs.forEach((t) => {
        t.classList.remove("border-red-500");
        t.classList.add("border-transparent");
      });

      tab.classList.remove("border-transparent");
      tab.classList.add("border-red-500");

      tabContents.forEach((content) => content.classList.add("hidden"));
      document.getElementById(selectedTab).classList.remove("hidden");
    });
  });
}
