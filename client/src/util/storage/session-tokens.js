import { SESSION_TOKEN } from "src/config/__index.js";

export function isTokenAcceptable(token) {
  const isAcceptable =
    token &&
    typeof token === "string" &&
    token.startsWith("Bearer ") &&
    !token.includes("null") &&
    !token.includes("undefined");

  return isAcceptable;
}

export function getSessionToken() {
  const token = window.localStorage.getItem(SESSION_TOKEN);

  if (token && !isTokenAcceptable(token)) {
    console.error(
      "stored token was automatically deleted due to being invalid"
    );

    window.localStorage.removeItem(SESSION_TOKEN);
    return null;
  }

  return token;
}

export function setSessionToken(token) {
  if (!isTokenAcceptable(token)) {
    throw new Error("session token is missing or invalid");
  }

  window.localStorage.setItem(SESSION_TOKEN, token);
}

export function clearSessionToken() {
  window.localStorage.removeItem(SESSION_TOKEN);
}

export default {
  getSessionToken,
  setSessionToken,
  clearSessionToken,
  isTokenAcceptable,
};
