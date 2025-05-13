import { getToken, getUsername } from "../../utils/localStorage.js";
import { NOROFF_API_KEY, PROFILES_URL } from "../../constants/api.js";

export async function fetchLoggedInUserListings() {
  const token = getToken();
  const name = getUsername();

  if (!token || !name) {
    throw new Error("User not logged in");
  }

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-NOROFF-API-KEY": NOROFF_API_KEY,
    },
  };
  try {
    const PROFILE_URL = `${PROFILES_URL}/${name}/listings`;
    const response = await fetch(PROFILE_URL, options);
    const json = await response.json();

    if (!response.ok) {
      const errorMessage = Array.isArray(json.errors)
        ? json.errors.map((err) => err.message)
        : [json.message || "Failed to fetch listings"];

      throw errorMessage;
    }
    return json.data;
  } catch (error) {
    throw error;
  }
}
