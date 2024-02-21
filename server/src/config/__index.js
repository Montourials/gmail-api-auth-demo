import env from "./env.js";
import envG from "./env-g.js";
import _SCOPES from "./scopes.js";

export const {
  isTest,
  isDev,
  isProd,
  ORIGIN,
  NODE_ENV,
  PORT,
  SERVER_DEBUG,
  MONGOOSE_DEBUG,
  ROOT_URL,
  DB_URL,
  PRIVATE_KEY,
} = env;

export const {
  TOKEN_PATH,
  CLIENT_ID,
  PROJECT_ID,
  SECRET,
  AUTH_REDIRECT,
  AUTHZ_REDIRECT,
  ORIGINS,
} = envG;

export const SCOPES = _SCOPES;

export default {
  env,
  envG,
  SCOPES,
};
