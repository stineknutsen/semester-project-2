export function renderProfileBids(container, bids) {
  container.innerHTML = "";
  if (!bids || bids.length === 0) {
    container.innerHTML = "<p>No bids to display</p>";
    return;
  }

  bids.forEach((bid) => {
    const listingElement = document.createElement("div");
    listingElement.classList.add(
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
    titleElement.href = `/listings/index.html?id=${bid.listing.id}`;
    titleElement.classList.add("text-2xl", "font-ledger", "hover:underline");
    titleElement.textContent = bid.listing.title;

    const bidElement = document.createElement("p");
    bidElement.classList.add("font-poppins");
    bidElement.textContent = `Bid: ${bids[0].amount} credits`;

    listingElement.append(titleElement, bidElement);

    container.append(listingElement);
  });
}
