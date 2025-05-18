export function renderProfilePurchases(container, winnings) {
  container.innerHTML = "";
  if (!winnings || winnings.length === 0) {
    container.innerHTML = "<p>No purchases to display</p>";
    return;
  }

  winnings.forEach((winning) => {
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
    titleElement.href = `/listings/index.html?id=${winning.listing.id}`;
    titleElement.classList.add("text-2xl", "font-ledger", "hover:underline");
    titleElement.textContent = winning.listing.title;

    const bidElement = document.createElement("p");
    bidElement.classList.add("font-poppins");
    bidElement.textContent = `Purchased for: ${winnings[0].amount} credits`;

    listingElement.append(titleElement, bidElement);

    container.append(listingElement);
  });
}
