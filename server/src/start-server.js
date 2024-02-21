import { createServer } from "http";

import app from "./app.js";

import {
  PORT,
  SERVER_DEBUG,
  ROOT_URL,
  isDev,
  isTest,
  isProd,
} from "./config/__index.js";
import { logMemory } from "./util/__index.js";

export function startServer() {
  //logMemory();

  const httpServer = createServer(app);

  httpServer.listen(PORT, () => {
    if (isDev || (!isProd && SERVER_DEBUG)) {
      console.log(`Server ready at ${ROOT_URL}`);
      console.log("-------------------------------");
    }
  });

  return httpServer;
}

export default {
  startServer,
};
