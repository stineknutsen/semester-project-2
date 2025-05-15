import { getToken } from "../../utils/localStorage.js";
import { ALL_LISTINGS_URL, NOROFF_API_KEY } from "../../constants/api.js";

export async function deleteListing(listingId) {
  const token = getToken();

  if (!token) {
    throw new Error("Log in to delete listing");
  }

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-NOROFF-API-KEY": NOROFF_API_KEY,
    },
  };
  const LISTING_URL = `${ALL_LISTINGS_URL}/${listingId}`;
  const response = await fetch(LISTING_URL, options);
  if (!response.ok) {
    throw new Error("Failed to delete listing");
  }
  return response;
}
