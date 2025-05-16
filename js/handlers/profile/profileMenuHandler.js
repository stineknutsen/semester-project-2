import { displayProfileListings } from "../listings/displayProfileListings.js";
import { editListingHandler } from "../listings/editListingHandler.js";
import { displayProfileBids } from "../listings/displayProfileBids.js";

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
      displayProfileBids(listingsContainer);
    } else if (selectedTab === "purchases") {
      //displayProfilePurchases(listingsContainer);
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
