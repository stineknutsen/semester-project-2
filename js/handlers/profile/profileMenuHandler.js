import { displayProfileListings } from "../listings/displayProfileListings.js";
import { editListingHandler } from "../listings/editListingHandler.js";

export function profileMenuHandler() {
  const tabs = document.querySelectorAll(".tab");
  const listingsContainer = document.getElementById("profile-listings");
  function handleTabSwitch(selectedTab, tab) {
    tabs.forEach(
      (t) =>
        t.classList.remove("border-primary") +
        t.classList.add("border-transparent")
    );
    tab.classList.add("border-primary");
    tab.classList.remove("border-transparent");

    listingsContainer.innerHTML = "";

    if (selectedTab === "listings") {
      displayProfileListings(listingsContainer);
      editListingHandler();
    } else if (selectedTab === "bids") {
      //displayProfileBids(listingsContainer);
      listingsContainer.textContent =
        "For development: This is the Bids section.";
    } else if (selectedTab === "purchases") {
      //displayProfilePurchases(listingsContainer);
      listingsContainer.textContent =
        "For development: This is the Purchases section.";
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selectedTab = tab.dataset.tab;
      handleTabSwitch(selectedTab, tab);
    });
  });

  const defaultTab = document.querySelector('.tab[data-tab="listings"]');
  if (defaultTab) {
    handleTabSwitch("listings", defaultTab);
  }
}
