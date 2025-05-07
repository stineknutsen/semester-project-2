const TOKEN_KEY = "token";
const USERNAME_KEY = "username";

export function setUsername(username) {
  localStorage.setItem(USERNAME_KEY, username);
}
export function getUsername() {
  return localStorage.getItem(USERNAME_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
