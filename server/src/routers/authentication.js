import express from "express";
import cors from "cors";

import { ticketExtractor } from "../middleware/__index.js";

import { createNewUser } from "../db/__index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).send("whachu wan'");
});

///Receive and verify google ID token
router.options("/login", cors()); //enable pre-flight requests
router.post("/login", ticketExtractor, async (req, res) => {
  try {
    const idTicket = req.body.idTicket;
    const gUserId = req.body.gUserId;

    const { user, isNewUser } = await createNewUser(gUserId);
    delete req.body.gUserId;

    const status = isNewUser ? 201 : 200;

    const resData = {
      user: {
        ...idTicket,
        id: user.id,
      },
      isNewUser,
      sessionToken: req.body.sessionToken,
    };

    return res.status(status).json(resData);
  } catch (e) {
    console.error("login route: ", e);
    return res.status(500).send("Something went wrong!");
  }
});

export default router;
