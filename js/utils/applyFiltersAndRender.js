import { renderFeedListings } from "../ui/listings/renderFeedListings.js";

export function applyFiltersAndRender(allListings, container) {
  const searchValue =
    document.getElementById("search-input")?.value.toLowerCase() || "";
  const sortValue = document.getElementById("sort-select")?.value || "newest";
  const tagValue =
    document.getElementById("tags-input")?.value.toLowerCase() || "";

  let filteredListings = allListings;

  if (searchValue) {
    filteredListings = filteredListings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(searchValue) ||
        listing.description?.toLowerCase().includes(searchValue)
    );
  }

  if (tagValue) {
    const tagArray = tagValue.split(",").map((tag) => tag.trim().toLowerCase());
    filteredListings = filteredListings.filter((listing) =>
      listing.tags?.some((tag) =>
        tagArray.some((inputTag) => tag.toLowerCase().includes(inputTag))
      )
    );
  }

  if (sortValue === "newest") {
    filteredListings.sort((a, b) => new Date(b.created) - new Date(a.created));
  } else if (sortValue === "oldest") {
    filteredListings.sort((a, b) => new Date(a.created) - new Date(b.created));
  }

  renderFeedListings(container, filteredListings);
}
