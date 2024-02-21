import { createGmailClient } from "../../gauth/__index.js";

export default async function getMessageList(
  oAuthClient,
  nextPageToken,
  maxResults = 500
) {
  const { messagesClient } = createGmailClient();

  const response = await messagesClient?.list({
    auth: oAuthClient,
    pageToken: nextPageToken,
    maxResults,
    userId: "me",
  });

  const messageData = response.data?.messages;

  const messages = Array.isArray(messageData) ? [...messageData] : [];

  const messageList = messages.map((message) => `${message.id}`);

  const newNextPageToken = response.data?.nextPageToken
    ? `${response.data?.nextPageToken}`
    : "";

  return { messageList, newNextPageToken };
}
