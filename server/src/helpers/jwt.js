import jwt from "jsonwebtoken";

import { PRIVATE_KEY } from "../config/__index.js";

export function createJwt(payload) {
  if (!payload || typeof payload !== "object") {
    throw new TypeError("jwt payload must be object literal");
  }

  return jwt.sign(payload, PRIVATE_KEY, { expiresIn: "1h" });
}

export function verifyJwt(token) {
  return jwt.verify(token, PRIVATE_KEY);
}

//Returns undefined/false if invalid/expired, else returns the number of ms until expiration
function checkExpiration(decodedToken) {
  if (!decodedToken || !decodedToken.exp) return;

  const expiry = decodedToken.exp;
  const expiryInMs = expiry * 1000;

  const currentMs = Date.now();

  const isExpired = currentMs >= expiryInMs;

  if (isExpired) return false;

  return expiryInMs - currentMs;
}

//issue a new jwt with the same payload if token is valid but near expiration
export function renewJwt(
  token,
  payloadName = "gUserId",
  refreshPeriod = 600000 //10min = 600,000ms
) {
  const decodedToken = verifyJwt(token);

  if (!decodedToken || !decodedToken.exp || !decodedToken[payloadName]) return;

  const timeUntilExpiration = checkExpiration(decodedToken);

  if (!timeUntilExpiration) {
    console.warn(`session token is invalid or expired`);
    return;
  }

  //session token is valid but expiration is still too far away for refresh
  if (timeUntilExpiration >= refreshPeriod) return token;

  const payload = decodedToken[payloadName];

  let newToken = {};
  newToken[payloadName] = payload;

  console.log("issuing a refreshed session token");

  return createJwt(newToken);
}

export default { createJwt, verifyJwt, renewJwt };
