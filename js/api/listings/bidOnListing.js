import { getToken } from "../../utils/localStorage.js";
import { NOROFF_API_KEY, ALL_LISTINGS_URL } from "../../constants/api.js";

export async function bidOnListing(listingId, amount) {
  const token = getToken();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-NOROFF-API-KEY": NOROFF_API_KEY,
    },
    body: JSON.stringify(amount),
  };

  const BID_ON_LISTING_URL = `${ALL_LISTINGS_URL}/${listingId}/bids`;
  const response = await fetch(BID_ON_LISTING_URL, options);

  const json = await response.json();

  console.log(json);

  if (!response.ok) {
    throw response.errors || new Error(response.message);
  }
  return response;
}
