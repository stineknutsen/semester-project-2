import { ALL_LISTINGS_URL, NOROFF_API_KEY } from "../../constants/api.js";

export async function fetchListings(
  limit = 24,
  page = 1,
  sort = "created",
  sortOrder = "desc"
) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "X-NOROFF-API-KEY": NOROFF_API_KEY,
    },
  };
  const LISTINGS_URL = `${ALL_LISTINGS_URL}?_bids=true&_seller=true&limit=${limit}&page=${page}&sort=${sort}&sortOrder=${sortOrder}`;
  const response = await fetch(LISTINGS_URL, options);
  const json = await response.json();

  if (!response.ok) {
    const errorMessage = Array.isArray(json.errors)
      ? json.errors.map((err) => err.message)
      : [json.message || "Failed to fetch listings"];

    throw errorMessage;
  }
  return json;
}
