const BASE_API_URL = "https://v2.api.noroff.dev";

export const AUTH_REGISTER_URL = `${BASE_API_URL}/auth/register`;
export const AUTH_LOGIN_URL = `${BASE_API_URL}/auth/login`;
export const ALL_POSTS_URL = `${BASE_API_URL}/auction/listings`;
export const PROFILES_URL = `${BASE_API_URL}/auction/profiles`;

export const TAG = "4uctioneer";
export const TAG_POSTS_URL = `${ALL_POSTS_URL}?_tag=${TAG}`;

export const NOROFF_API_KEY = "2770d9d4-18cf-4ffa-ac12-2a5f76b67f29";
