import { ALL_LISTINGS_URL, NOROFF_API_KEY } from "../../constants/api.js";

export async function fetchListings() {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "X-NOROFF-API-KEY": NOROFF_API_KEY,
    },
  };
  const LISTINGS_URL = `${ALL_LISTINGS_URL}?_bids=true&_seller=true`;
  const response = await fetch(LISTINGS_URL, options);
  const json = await response.json();

  if (!response.ok) {
    const errorMessage = Array.isArray(json.errors)
      ? json.errors.map((err) => err.message)
      : [json.message || "Failed to fetch listings"];

    throw errorMessage;
  }
  return json.data;
}
