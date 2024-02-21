import _ from "lodash";
import express from "express";

import { createGmailClient, createOAuthClient } from "../../gauth/__index.js";
import { cors, createUuid } from "../../helpers/__index.js";
import { checkSessionToken } from "../../middleware/__index.js";

import listBuilder from "./list-builder.js";

const router = express.Router();

router.use([checkSessionToken]);

router.options("/list", cors());
router.post("/list", async (req, res) => {
  try {
    const {
      oauthClient,
      isUserAuthenticated,
      isUserAuthorized,
      userHasRefreshToken,
    } = await createOAuthClient(req.body.currentUser?.gUserId);

    if (!isUserAuthenticated) {
      return res.status(400).send("user is not authenticated");
    }

    if (!userHasRefreshToken || !isUserAuthorized) {
      return res.status(401).send("reauthorization is required");
    }

    const nextPageToken = req.body?.nextPageToken;

    const { sendersList, newNextPageToken } = await listBuilder(
      oauthClient,
      nextPageToken
    );

    if (!sendersList || sendersList.length === 0) {
      return res.status(404).send("no results");
    }

    return res.send({
      sendersList,
      thisPageToken: nextPageToken,
      nextPageToken: newNextPageToken,
      pageId: createUuid(),
    });
  } catch (e) {
    console.error("e", e);

    return res.status(500).send(`something went wrong: ${e.message}`);
  }
});

router.options("/del", cors());
router.delete("/del", async (req, res) => {
  if (!Array.isArray(req.body) || req.body.length === 0) {
    return res.status(400).send("missing or invalid body");
  }

  let messageIds = [];

  try {
    const reqData = [...req.body];

    const { oauthClient } = await createOAuthClient(
      req.body.currentUser?.gUserId
    );
    const { messagesClient } = createGmailClient();

    reqData.forEach((sender) => {
      messageIds = messageIds.concat(sender.messageIds);
    });

    const gResponse = await messagesClient.batchDelete({
      auth: oauthClient,
      userId: "me",
      ids: [...messageIds],
    });

    if (gResponse.status !== 204) {
      return res.status(500).send("something went wrong");
    }

    return res.status(200).send("");
  } catch (e) {
    console.error(e);
    return res.status(500).send(`something is amiss: ${e.message}`);
  }
});

export default router;
