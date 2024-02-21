import { loadEnv } from "../util/__index.js";

const env =
  process.env.NODE_ENV === "production" ? process.env : await loadEnv();

const ORIGIN = env.ORIGIN;

const PORT = env.PORT;

const SERVER_DEBUG = env.SERVER_DEBUG;
const MONGOOSE_DEBUG = env.MONGOOSE_DEBUG;

const ROOT_URL = env.ROOT_URL;

const DB_URL = env.DB_URL;

const PRIVATE_KEY = env.PRIVATE_KEY;

const NODE_ENV = env.NODE_ENV.toLowerCase();

const isTest = NODE_ENV === "test";
const isDev = NODE_ENV === "dev" || NODE_ENV === "development";
const isProd = NODE_ENV === "production";

export default {
  NODE_ENV,
  isDev,
  isProd,
  isTest,
  ORIGIN,
  PORT,
  SERVER_DEBUG,
  MONGOOSE_DEBUG,
  ROOT_URL,
  DB_URL,
  PRIVATE_KEY,
};
