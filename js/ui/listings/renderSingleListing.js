export function renderSingleListing(container, listing) {
  container.innerHTML = "";

  if (!listing) {
    container.innerHTML = "<p>No post to display</p>";
    return;
  }

  const listingElement = document.createElement("div");
  listingElement.classList.add(
    "mb-4",
    "p-4",
    "shadow",
    "rounded-lg",
    "grid",
    "gap-4",
    "sm:grid-cols-2"
  );

  const imageDiv = document.createElement("div");
  imageDiv.classList.add("mb-4", "relative");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("mb-4");

  const titleElement = document.createElement("h2");
  titleElement.classList.add("text-2xl", "font-bold", "mb-2");
  titleElement.textContent = listing.title;

  const imageElement = document.createElement("img");
  imageElement.src = listing.media[0].url;
  imageElement.alt = listing.media[0].alt;

  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("mb-2");
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
  endDateElement.textContent = `Ends: ${endDate.toLocaleDateString()}`;

  imageDiv.append(imageElement, endDateElement);
  infoDiv.append(titleElement, descriptionElement);
  listingElement.append(imageDiv, infoDiv);
  container.append(listingElement);
}
