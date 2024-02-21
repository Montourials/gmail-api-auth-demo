import cors from "cors";

import { ORIGIN } from "../config/__index.js";

export default function useCORS() {
  return cors({ origin: ORIGIN, exposedHeaders: "NewSessionToken" });
}
