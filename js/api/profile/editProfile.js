import { getToken, getUsername } from "../../utils/localStorage.js";
import { NOROFF_API_KEY, PROFILES_URL } from "../../constants/api.js";

export async function editProfile(updatedProfile) {
  const token = getToken();
  const username = getUsername();

  if (!token) {
    throw new Error("Log in to see profile");
  }

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-NOROFF-API-KEY": NOROFF_API_KEY,
    },
    body: JSON.stringify(updatedProfile),
  };

  const PROFILE_URL = `${PROFILES_URL}/${username}`;
  const response = await fetch(PROFILE_URL, options);

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }
  const json = await response.json();
  return json.data;
}
