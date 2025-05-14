export function renderFeedListings(container, listings) {
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

    const endDate = new Date(listing.endsAt);
    const endDateElement = document.createElement("p");
    endDateElement.classList.add(
      "bg-light",
      "text-dark",
      "shadow",
      "px-3",
      "py-1",
      "rounded-md",
      "font-poppins",
      "absolute",
      "top-5",
      "right-5"
    );
    endDateElement.textContent = "Ends " + endDate.toLocaleDateString();
    endDateElement.dataset.type = "endsAt";

    const image = listing.media;
    const imageElement = document.createElement("img");
    imageElement.src = image[0]?.url;
    imageElement.alt = image[0]?.alt;
    imageElement.classList.add("h-64", "w-full", "object-cover");

    const title = listing.title;
    const titleElement = document.createElement("h2");
    titleElement.textContent = title;
    titleElement.classList.add("text-2xl", "font-ledger", "my-2");
    titleElement.dataset.type = "title";

    const description = listing.description;
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.classList.add("font-poppins");
    descriptionElement.dataset.type = "description";

    const tags = listing.tags.join(" ");
    const tagsElement = document.createElement("p");
    tagsElement.textContent = tags.split(",").join(", ");
    tagsElement.classList.add("font-poppins", "bg-secondary", "px-2", "py-1");
    tagsElement.dataset.type = "tags";

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
      tagsElement,
      bidsElement,
      viewButton
    );
    container.append(postElement);
  });
}
