import { userDb } from "../../db/__index.js";
import { createOAuthClient } from "../../gauth/__index.js";

///Requires useOAuthClient and checkSessionToken to run first
export async function storeNewTokens(req, _res, next) {
  const userId = req.body.currentUser?.gUserId;

  if (!userId) {
    return next(
      Error("Request is missing an authenticated user to associate tokens with")
    );
  }

  const { oauthClient } = await createOAuthClient(userId);

  try {
    oauthClient.on("tokens", (tokens) => {
      const refreshToken = tokens.refresh_token;
      const accessToken = tokens.access_token;

      if (refreshToken) {
        console.log("saving refresh token to user");

        userDb
          .findOneAndUpdate({ userId }, { refreshToken })
          .then(() => next())
          .catch((e) => {
            console.error(e);
            next(e);
          });
      }

      if (accessToken) {
        console.log("saving access token to user");

        userDb
          .findOneAndUpdate({ userId }, { accessToken })
          .then(() => next())
          .catch((e) => {
            console.error(e);
            next(e);
          });
      }
    });

    next();
  } catch (e) {
    next(e);
  }
}

export default { storeNewTokens };
