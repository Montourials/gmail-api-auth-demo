import _ from "lodash";

import { asyncForEach } from "../../helpers/__index.js";

import getMessageList from "./get-message-list.js";
import getMessageDetails from "./get-message-details.js";
import getSenderFromHeaders from "./get-sender-from-headers.js";

export default async function listBuilder(oAuthClient, nextPageToken) {
  let sendersCount = {};

  const { messageList, newNextPageToken } = await getMessageList(
    oAuthClient,
    nextPageToken
  );

  await asyncForEach(messageList, async (messageId) => {
    const { headers } = await getMessageDetails(oAuthClient, messageId);
    const sender = getSenderFromHeaders(headers);

    if (!sender) {
      console.error("n o s e n d e r");
      return;
    }

    const listedSender = sendersCount[sender.email];

    const isNewSender = !listedSender;

    const count = isNewSender ? 1 : listedSender.count + 1;

    const messageIds = isNewSender
      ? [`${messageId}`]
      : [...listedSender.messageIds, `${messageId}`];

    sendersCount[sender.email] = {
      ...sender,
      count,
      messageIds,
    };
  });

  const sendersList = Object.keys(sendersCount).map((key) => sendersCount[key]);

  return { sendersList, newNextPageToken };
}
