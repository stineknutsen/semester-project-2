export function populateEditListingForm(listing) {
  const form = document.getElementById("edit-listing-form");

  form.dataset.id = listing.id;

  form.title.value = listing.title;
  form.description.value = listing.description;
  form.tags.value = listing.tags;
  form.imageUrl.value = listing.media[0].url;
  form.imageAlt.value = listing.media[0].alt;
  form.endDate.value = new Date(listing.endsAt).toISOString().slice(0, 10);
}
