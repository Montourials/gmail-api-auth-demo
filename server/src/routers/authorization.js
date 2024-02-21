import express from "express";
import cors from "cors";

import { userDb } from "../db/__index.js";
import { generateAuthUrl, createOAuthClient } from "../gauth/__index.js";
import { storeNewTokens, checkSessionToken } from "../middleware/__index.js";

function genericFail(res, label = "unknown") {
  return res.status(500).send(`something went wrong: ${label}`);
}

const router = express.Router();

router.use(checkSessionToken);

//Redirect user to authz url to begin the oauth flow
router.get("/consent", async (req, res) => {
  try {
    const { oauthClient, isUserAuthenticated } = await createOAuthClient(
      req.body.currentUser?.gUserId
    );

    if (!isUserAuthenticated) {
      return genericFail(res, "invalid user");
    }

    const authzUrl = await generateAuthUrl(oauthClient);
    return res.send(authzUrl);
  } catch (e) {
    console.error("failed to get consent", e);
    return genericFail(res);
  }
});

router.options("/token", cors()); //enable pre-flight requests
///Exchange code for token(s)
router.post("/token", async (req, res) => {
  const csrfHeader = req.get("X-Requested-With");
  if (!csrfHeader || csrfHeader !== "XmlHttpRequest") {
    //Error handling: developers.google.com/identity/protocols/oauth2/web-server#userconsentprompt
    return res.status(401).send("no");
  }

  const code = req.body.code;

  if (!code) {
    return res.status(400).send("missing code");
  }

  const gUserId = req.body.currentUser?.gUserId;

  try {
    const { oauthClient, isUserAuthenticated } =
      await createOAuthClient(gUserId);

    if (!isUserAuthenticated) {
      return genericFail(res, "invalid user");
    }

    const { tokens } = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);

    const { scope, expiry_date, refresh_token: refreshToken } = tokens; //not returned: access_token, token_type

    if (refreshToken) {
      const user = await userDb.findOne({ userId: gUserId });

      if (!user) {
        console.error("no user?!");
        return;
      }

      user.refreshToken = `${refreshToken}`;
      await user.save();
      console.log("refresh token saved to user");
    }

    const resData = {
      isAuthorized: true,
      scope,
      expiration: expiry_date,
    };

    return res.json(resData);
  } catch (e) {
    console.error("authz token route: ", e);
    return genericFail(res, e.message);
  }
});

export default router;
