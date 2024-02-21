import { startServer } from "./src/start-server.js";
import { connectToDb } from "./src/db/__index.js";

startServer();
connectToDb();
