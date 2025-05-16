import { getUsername } from "../../utils/localStorage.js";

export function renderProfileBids(container, listings) {
  container.innerHTML = "";
  if (!listings || listings.length === 0) {
    container.innerHTML = "<p>No bids to display</p>";
    return;
  }

  listings.forEach((listing) => {
    const postElement = document.createElement("div");
    postElement.classList.add(
      "mb-4",
      "border",
      "border-dark",
      "p-4",
      "shadow",
      "rounded-lg",
      "relative",
      "flex",
      "flex-col",
      "justify-between",
      "gap-4",
      "flex-grow"
    );

    const titleElement = document.createElement("a");
    titleElement.href = `/listings/index.html?id=${listing.id}`;
    titleElement.classList.add("text-2xl", "font-ledger", "hover:underline");
    titleElement.textContent = listing.title;

    const username = getUsername();
    const usersBid = listing.bids?.filter(
      (bid) => bid.bidder.name === username
    );

    const bidElement = document.createElement("p");
    bidElement.classList.add("font-poppins");
    bidElement.textContent = `Bid: ${usersBid[0].amount} credits`;

    postElement.append(titleElement, bidElement);

    container.append(postElement);
  });
}
