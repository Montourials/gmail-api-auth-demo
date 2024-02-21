import { BASE_URL } from "src/config/__index.js";

///Input one of our URIs (eg '/profile' or 'profile') to return a URL (eg 'https://site-name.com/profile')
export function buildPageUrl(uri) {
  if (!uri || typeof uri !== "string") {
    throw new TypeError("invalid uri");
  }

  if (uri === "/") return BASE_URL;

  const uriHasSlash = uri.startsWith("/");
  return uriHasSlash ? `${BASE_URL}${uri}` : `${BASE_URL}/${uri}`;
}

export default {
  buildPageUrl,
};

//all URLS are URIs, but not all URIs are URLs
