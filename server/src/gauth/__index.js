import authorization from "./authorization/__index.js";

import _createGmailClient from "./create-gmail-client.js";
import _createOAuthClient from "./create-oauth-client.js";

export const { generateAuthUrl } = authorization;

export const { createGmailClient } = _createGmailClient;
export const { createOAuthClient } = _createOAuthClient;

export default {
  authorization,

  createGmailClient,
  createOAuthClient,
};
