import { OAuth2Client } from "google-auth-library";

import { AUTHZ_REDIRECT, CLIENT_ID, SECRET } from "../config/__index.js";
import { userDb } from "../db/__index.js";

//Generate and return a google oAuth client and if given userId, check user auth & authz statuses
export async function createOAuthClient(userId, redirectUri = AUTHZ_REDIRECT) {
  const oauthClient = new OAuth2Client(CLIENT_ID, SECRET, redirectUri);

  let isUserAuthenticated = false;
  let isUserAuthorized = false;

  if (!userId) return { oauthClient, isUserAuthenticated, isUserAuthorized };

  const user = await userDb.findOne({ userId });

  isUserAuthenticated = !!user;

  const refresh_token = user?.refreshToken;

  if (!refresh_token) {
    return {
      oauthClient,
      isUserAuthenticated,
      isUserAuthorized,
      userHasRefreshToken: false,
    };
  }

  try {
    oauthClient.setCredentials({ refresh_token }); //When client has a refresh token, it acquires access tokens automatically

    return {
      oauthClient,
      isUserAuthenticated,
      isUserAuthorized: true,
      userHasRefreshToken: true,
    };
  } catch (e) {
    console.error("failed to refresh access token: ", e.message);

    user.refreshToken = undefined;
    await user.save();

    return {
      oauthClient,
      isUserAuthenticated,
      userHasRefreshToken: true, //user HAD refresh token - this is going to confuse me at some point unless changed
      isUserAuthorized: false,
    };
  }
}

export default { createOAuthClient };
