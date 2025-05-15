import { ALL_LISTINGS_URL, NOROFF_API_KEY } from "../../constants/api.js";
import { getToken } from "../../utils/localStorage.js";

export async function editListing(listingId, updatedListing) {
  const token = getToken();

  if (!token) {
    throw new Error("Log in to edit listing");
  }

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-NOROFF-API-KEY": NOROFF_API_KEY,
    },
    body: JSON.stringify(updatedListing),
  };

  const LISTING_URL = `${ALL_LISTINGS_URL}/${listingId}`;
  const response = await fetch(LISTING_URL, options);

  if (!response.ok) {
    throw new Error("Failed to update listing");
  }
  const json = await response.json();
  return json.data;
}
