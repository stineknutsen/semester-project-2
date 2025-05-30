import { getToken } from "../../utils/localStorage.js";

export function renderSingleListing(container, listing) {
  container.innerHTML = "";

  if (!listing) {
    container.innerHTML = "<p>No post to display</p>";
    return;
  }

  const token = getToken();

  const listingElement = document.createElement("div");
  listingElement.classList.add(
    "p-4",
    "grid",
    "gap-8",
    "sm:grid-cols-2",
    "mx-auto",
    "mt-8"
  );

  const imageDiv = document.createElement("div");
  imageDiv.classList.add("mb-4", "sm:mb-0", "relative");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("flex", "flex-col", "gap-4");

  const titleElement = document.createElement("h2");
  titleElement.classList.add("text-3xl", "font-ledger", "mb-4");
  titleElement.textContent = listing.title;

  const sellerName = listing.seller.name;
  const sellerElement = document.createElement("p");
  sellerElement.id = "listing-seller";
  sellerElement.dataset.seller = sellerName;
  sellerElement.classList.add("font-poppins");
  sellerElement.textContent = `Seller: ${sellerName}`;

  const imageElement = document.createElement("img");
  imageElement.src = listing.media[0].url;
  imageElement.alt = listing.media[0].alt;
  imageElement.classList.add(
    "rounded-md",
    "w-full",
    "h-[400px]",
    "object-cover",
    "shadow"
  );

  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("font-poppins");
  descriptionElement.textContent = listing.description;

  const endDate = new Date(listing.endsAt);
  const endDateElement = document.createElement("p");
  endDateElement.classList.add(
    "bg-dark",
    "text-light",
    "shadow",
    "px-3",
    "py-1",
    "rounded-md",
    "font-poppins",
    "absolute",
    "top-4",
    "right-4"
  );
  endDateElement.textContent = `End date: ${endDate.toLocaleDateString()}`;

  const createdElement = document.createElement("p");
  createdElement.classList.add("font-poppins");
  const date = new Date(listing.created);
  createdElement.textContent = `Posted: ${date.toLocaleDateString()}`;

  const tagsElement = document.createElement("div");
  tagsElement.classList.add("flex", "flex-wrap", "gap-2", "mb-4");
  listing.tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.classList.add(
      "bg-secondary",
      "text-dark",
      "shadow",
      "px-3",
      "py-1",
      "rounded-full",
      "font-poppins"
    );
    tagElement.textContent = tag;
    tagsElement.append(tagElement);
  });

  const bids = listing.bids.sort((a, b) => b.amount - a.amount);
  const bidsElement = document.createElement("div");
  bidsElement.textContent = "Bid History:";
  bidsElement.classList.add("font-poppins");
  bids.forEach((bid) => {
    const bidElement = document.createElement("div");
    bidElement.classList.add(
      "font-poppins",
      "bg-secondary",
      "border-l-4",
      "border-l-primary",
      "px-2",
      "py-1",
      "mb-2"
    );
    const bidderElement = document.createElement("p");
    const amountElement = document.createElement("p");
    const bidTimeElement = document.createElement("p");

    bidderElement.textContent = "Bidder: " + bid.bidder.name;
    amountElement.textContent = "Amount: " + bid.amount + " credits";
    bidTimeElement.textContent =
      "Time: " + new Date(bid.created).toLocaleString();

    bidElement.append(bidderElement, amountElement, bidTimeElement);
    bidsElement.append(bidElement);
  });

  const highestBid = bids[0];
  const highestBidElement = document.createElement("p");
  highestBidElement.dataset.amount = highestBid.amount;
  highestBidElement.id = "highestBidDisplay";
  highestBidElement.classList.add("font-poppins");
  highestBidElement.textContent = `Highest bid: ${highestBid.amount} credits`;

  const placeBidElement = document.createElement("form");
  placeBidElement.dataset.id = listing.id;
  placeBidElement.method = "post";
  placeBidElement.id = "place-bid-form";
  placeBidElement.classList.add("flex", "flex-wrap", "items-center", "gap-2");
  const placeBidInput = document.createElement("input");
  placeBidInput.type = "number";
  placeBidInput.name = "amount";
  placeBidInput.step = "1";
  placeBidInput.required = true;
  placeBidInput.placeholder = "Enter credits to bid";
  placeBidInput.classList.add(
    "bg-light",
    "text-dark",
    "shadow",
    "px-3",
    "py-1",
    "font-poppins",
    "border",
    "border-dark",
    "rounded-md",
    "w-full"
  );
  const placeBidButton = document.createElement("button");
  placeBidButton.type = "submit";
  placeBidButton.classList.add(
    "bg-primary",
    "text-light",
    "border",
    "border-primary",
    "shadow",
    "hover:bg-light",
    "hover:text-primary",
    "px-3",
    "py-1",
    "font-poppins",
    "font-semibold",
    "rounded-md",
    "transition",
    "duration-300"
  );
  placeBidButton.textContent = "Place Bid";

  const loginElement = document.createElement("a");
  loginElement.href = "/account/login.html";
  loginElement.classList.add(
    "bg-secondary",
    "text-dark",
    "border-l-4",
    "border-l-primary",
    "shadow",
    "px-3",
    "py-1",
    "font-poppins"
  );
  loginElement.textContent = "Please register or log in to place bids";

  if (!token) {
    placeBidElement.classList.add("hidden");
    return;
  }
  if (token) {
    loginElement.classList.add("hidden");
  }

  if (endDate < Date.now()) {
    endDateElement.textContent =
      "Listing ended: " + endDate.toLocaleDateString();
    endDateElement.classList.add("text-primary");
    placeBidElement.classList.add("hidden");
    loginElement.classList.add("hidden");
  }

  imageDiv.append(imageElement, endDateElement);
  placeBidElement.append(placeBidInput, placeBidButton);
  infoDiv.append(
    titleElement,
    sellerElement,
    createdElement,
    descriptionElement,
    tagsElement,
    highestBidElement,
    loginElement,
    placeBidElement,
    bidsElement
  );
  listingElement.append(imageDiv, infoDiv);
  container.append(listingElement);
}
