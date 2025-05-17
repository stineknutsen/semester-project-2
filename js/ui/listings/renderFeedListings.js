export function renderFeedListings(container, listings) {
  container.innerHTML = "";
  if (!listings || listings.length === 0) {
    container.innerHTML = "<p>No listings to display</p>";
    return;
  }

  listings.forEach((listing) => {
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
      "flex-grow",
      "overflow-hidden"
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
    titleElement.textContent = title.slice(0, 100);
    titleElement.classList.add("text-2xl", "font-ledger", "my-2");
    titleElement.dataset.type = "title";

    const created = new Date(listing.created);
    const createdElement = document.createElement("p");
    createdElement.textContent = "Created " + created.toLocaleDateString();
    createdElement.classList.add("font-poppins");
    createdElement.dataset.type = "created";

    const description = listing.description;
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.classList.add("font-poppins");
    descriptionElement.dataset.type = "description";

    const tags = listing.tags;
    const tagsElement = document.createElement("div");
    tagsElement.classList.add("flex", "flex-wrap");
    tags.forEach((tag) => {
      const tagElement = document.createElement("p");
      tagElement.textContent = tag;
      tagElement.classList.add(
        "font-poppins",
        "bg-secondary",
        "px-2",
        "py-1",
        "rounded-full",
        "shadow",
        "mr-2"
      );
      tagElement.dataset.type = "tags";
      tagsElement.appendChild(tagElement);
    });
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
    viewButton.dataset.id = listing.id;

    const viewLink = document.createElement("a");
    viewLink.textContent = "See Auction";
    viewLink.classList.add("w-full");
    viewLink.href = "/listings/index.html?id=" + listing.id;
    viewButton.append(viewLink);

    if (endDate < new Date()) {
      endDateElement.textContent =
        "Auction ended: " + endDate.toLocaleDateString();
      endDateElement.classList.add("text-primary");
    }

    listingElement.append(
      imageElement,
      titleElement,
      endDateElement,
      createdElement,
      descriptionElement,
      tagsElement,
      bidsElement,
      viewButton
    );
    container.append(listingElement);
  });
}
