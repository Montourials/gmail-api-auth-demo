import { createGmailClient } from "../../gauth/__index.js";

export default async function getMessageDetails(oAuthClient, id) {
  const { messagesClient } = createGmailClient();

  const response = await messagesClient?.get({
    id,
    auth: oAuthClient,
    userId: "me",
    format: "metadata",
  });

  const payload = response.data?.payload;

  if (payload) {
    return { ...payload };
  }
}
