import { NOROFF_API_KEY, ALL_LISTINGS_URL } from "../../constants/api.js";

export async function createListing(postData, token) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-NOROFF-API-KEY": NOROFF_API_KEY,
    },
    body: JSON.stringify(postData),
  };
  const response = await fetch(ALL_LISTINGS_URL, options);
  const json = await response.json();

  if (!response.ok) {
    const errorMessage = Array.isArray(json.errors)
      ? json.errors.map((err) => err.message)
      : [json.message || "Listing creation failed"];

    throw errorMessage;
  }
  return json.data;
}
