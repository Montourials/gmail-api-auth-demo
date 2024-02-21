import path from "node:path";
import express from "express";

import { cors } from "./helpers/__index.js";
import { requestLogger, requestScrubber } from "./middleware/__index.js";

import {
  authenticationRouter,
  authzRouter,
  sendersRouter,
} from "./routers/__index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use("/api/auth", authenticationRouter);
app.use("/api/authz", authzRouter);
app.use("/api/senders", sendersRouter);

app.use(requestScrubber);

app.use("/api/*", (req, res) => {
  return res.status(404).end();
});

//TODO: For best results, use a reverse proxy cache to improve performance of serving static assets
app.use(express.static("dist"));
app.use("/authz", express.static("dist")); //allows authz redirect in prod
app.use(
  "/*.css",
  express.static("dist", {
    setHeaders: function (res, _path, _stat) {
      res.set("Content-Type", "text/css");
    },
  })
);

export default app;
