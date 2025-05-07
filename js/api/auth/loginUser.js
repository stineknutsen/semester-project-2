import { AUTH_LOGIN_URL } from "../../constants/api.js";

export async function loginUser(user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(AUTH_LOGIN_URL, options);

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = Array.isArray(data.errors)
      ? data.errors.map((err) => err.message)
      : [data.message || "Login failed"];

    throw errorMessage;
  }
  console.log(data);
  return data;
}
