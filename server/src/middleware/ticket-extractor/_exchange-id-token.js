import { CLIENT_ID } from "../../config/__index.js";

import { createOAuthClient } from "../../gauth/create-oauth-client.js";

/* Verify and decode a GIS id token, exchange it for an id ticket if valid, and pass it to the callback argument */
export function exchangeIdToken(authClient, idToken, callback) {
  if (!idToken) {
    throw new Error("missing id token");
  }

  authClient.verifyIdToken(
    { idToken, audience: CLIENT_ID },
    async (err, ticket) => {
      if (err) {
        throw err;
      }

      callback(ticket);
    }
  );
}
export default {
  exchangeIdToken,
};
