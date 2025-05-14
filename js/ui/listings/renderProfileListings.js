export function renderProfileListings(container, listings) {
  container.innerHTML = "";
  if (!listings || listings.length === 0) {
    container.innerHTML = "<p>No listings to display</p>";
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
      "relative"
    );

    const editButton = document.createElement("button");
    editButton.classList.add(
      "bg-light",
      "text-dark",
      "hover:text-primary",
      "shadow",
      "px-3",
      "py-1",
      "rounded-md",
      "font-poppins",
      "absolute",
      "top-5",
      "right-5"
    );
    editButton.textContent = "Edit Listing";
    editButton.dataset.id = listing.id;

    const image = listing.media[0];
    const imageElement = document.createElement("img");
    imageElement.src = image.url;
    imageElement.alt = image.alt;
    imageElement.classList.add("h-64", "w-full", "object-cover");

    const title = listing.title;
    const titleElement = document.createElement("h2");
    titleElement.textContent = title;
    titleElement.classList.add("text-2xl", "font-ledger", "my-2");

    const description = listing.description;
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.classList.add("font-poppins");

    const endDate = new Date(listing.endsAt);
    const endDateElement = document.createElement("p");
    endDateElement.textContent = "End Date: " + endDate.toLocaleDateString();
    endDateElement.classList.add("font-poppins");

    const bids = listing._count.bids;
    const bidsElement = document.createElement("p");
    bidsElement.textContent = "Bids: " + bids;
    bidsElement.classList.add(
      "font-poppins",
      "bg-secondary",
      "border-l-4",
      "border-l-primary",
      "px-2",
      "py-1"
    );

    const viewButton = document.createElement("button");
    viewButton.classList.add(
      "border",
      "border-dark",
      "bg-light",
      "text-dark",
      "shadow",
      "px-3",
      "py-1",
      "mt-4",
      "rounded-md",
      "font-poppins",
      "font-semibold",
      "w-full",
      "hover:bg-secondary"
    );
    viewButton.textContent = "See Auction";
    viewButton.dataset.id = listing.id;

    postElement.append(
      imageElement,
      titleElement,
      endDateElement,
      descriptionElement,
      bidsElement,
      editButton,
      viewButton
    );
    container.append(postElement);
  });
}
