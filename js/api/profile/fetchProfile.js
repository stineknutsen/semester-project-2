import { NOROFF_API_KEY, PROFILES_URL } from "../../constants/api.js";
import { getToken } from "../../utils/localStorage.js";

export async function fetchProfile(username) {
  console.log(username);
  const token = getToken();

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

  const PROFILE_URL = `${PROFILES_URL}/${username}`;
  console.log(PROFILE_URL);
  const response = await fetch(PROFILE_URL, options);

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  const json = await response.json();
  return json.data;
}
