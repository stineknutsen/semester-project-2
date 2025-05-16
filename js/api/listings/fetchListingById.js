import { getToken } from "../../utils/localStorage.js";
import { ALL_LISTINGS_URL, NOROFF_API_KEY } from "../../constants/api.js";

export async function fetchListingById(listingId) {
  const token = getToken();
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-NOROFF-API-KEY": NOROFF_API_KEY,
    },
  };
  const LISTING_URL = `${ALL_LISTINGS_URL}/${listingId}?_bids=true&_seller=true`;
  const response = await fetch(LISTING_URL, options);
  const json = await response.json();

  if (!response.ok) {
    const errorMessage = Array.isArray(json.errors)
      ? json.errors.map((err) => err.message)
      : [json.message || "Listing creation failed"];

    throw errorMessage;
  }
  return json.data;
}
