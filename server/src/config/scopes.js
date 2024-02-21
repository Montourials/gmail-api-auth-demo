import { loadEnv } from "../util/__index.js";

const env =
  process.env.NODE_ENV === "production" ? process.env : await loadEnv();

export default { gmail: env.gmail_scope };
