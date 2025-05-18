import { fetchListings } from "../../api/listings/fetchListings.js";
import { displayMessage } from "../../utils/displayMessage.js";
import { showLoader, hideLoader } from "../../utils/loader.js";
import { applyFiltersAndRender } from "../../utils/applyFiltersAndRender.js";
import { renderPaginationControls } from "../../ui/renderPaginationControls.js";

const limit = 24;
let currentPage = 1;
let currentSort = "created";
let currentSortOrder = "desc";

export async function displayFeedListings(page = 1) {
  const listingsContainer = document.getElementById("feed-listings");
  const paginationContainer = document.getElementById("pagination-controls");

  if (!listingsContainer || !paginationContainer) {
    return;
  }

  try {
    showLoader("feed-listings-loader");

    const response = await fetchListings(
      limit,
      page,
      currentSort,
      currentSortOrder
    );
    const listings = response.data;
    const totalCount = response.meta.totalCount;
    const totalPages = Math.ceil(totalCount / limit);

    currentPage = page;
    applyFiltersAndRender(listings, listingsContainer);
    renderPaginationControls(
      paginationContainer,
      totalPages,
      currentPage,
      displayFeedListings
    );

    listingsContainer.scrollIntoView({ behavior: "smooth", block: "start" });

    const sortSelect = document.getElementById("sort-select");
    sortSelect.addEventListener("change", (e) => {
      if (e.target.value === "oldest") {
        currentSortOrder = "asc";
      } else {
        currentSortOrder = "desc";
      }
      currentSort = "created";
      displayFeedListings(1);
    });

    document.getElementById("search-input").addEventListener("input", () => {
      applyFiltersAndRender(listings, listingsContainer);
    });

    document.getElementById("tags-input").addEventListener("input", () => {
      applyFiltersAndRender(listings, listingsContainer);
    });

    hideLoader("feed-listings-loader");
  } catch (error) {
    hideLoader("feed-listings-loader");
    displayMessage(listingsContainer, "error", error.message);
  }
}
