import { createJwt } from "../../helpers/__index.js";

import { exchangeIdToken } from "./_exchange-id-token.js";
import { decodeTicket } from "./_decodeTicket.js";
import { createOAuthClient } from "../../gauth/__index.js";

export async function ticketExtractor(req, res, next) {
  const token = req.body?.gidToken;

  if (!token) {
    return res.status(401).send("no gid token");
  }

  const { oauthClient } = await createOAuthClient();

  exchangeIdToken(oauthClient, token, (ticket) => {
    decodeTicket(ticket)
      .then(({ gTicket, userId }) => {
        const sessionToken = createJwt({ gUserId: userId });

        req.body.sessionToken = sessionToken;

        //In prod we would probably want to encrypt this too
        req.body.idTicket = gTicket;

        //Do not return to client (deleted by request scrubber and login route - is this a bad idea?)
        req.body.gUserId = userId;

        next();
      })
      .catch((e) => {
        console.error("ticketExtractor: ", e);
        return res.status(400).send("something went wrong");
      });
  });
}

export default {
  ticketExtractor,
};
