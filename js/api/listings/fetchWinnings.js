import { NOROFF_API_KEY, PROFILES_URL } from "../../constants/api.js";
import { getToken, getUsername } from "../../utils/localStorage.js";
export async function fetchWinnings() {
  const token = getToken();
  const username = getUsername();

  if (!token) {
    throw new Error("Log in to see profile");
  }

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-NOROFF-API-KEY": NOROFF_API_KEY,
    },
  };

  const PROFILE_URL = `${PROFILES_URL}/${username}/wins?_listings=true`;
  const response = await fetch(PROFILE_URL, options);

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  const json = await response.json();
  return json.data;
}
