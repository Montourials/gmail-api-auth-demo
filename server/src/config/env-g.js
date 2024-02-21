import { loadEnv } from "../util/__index.js";

const env =
  process.env.NODE_ENV === "production" ? process.env : await loadEnv();

/* The token file stores the user's access and refresh tokens, and is 
created automatically when the authorization flow completes for the first time */
export const TOKEN_PATH = env.token_path;

export const CLIENT_ID = env.client_id;
export const PROJECT_ID = env.project_id;
export const SECRET = env.client_secret;
export const AUTH_REDIRECT = env.auth_redirect_uri;
export const AUTHZ_REDIRECT = env.authz_redirect_uri;
export const ORIGINS = env.javascript_origins ?? [env.ORIGIN];

export default {
  TOKEN_PATH,

  CLIENT_ID,
  PROJECT_ID,
  SECRET,
  AUTH_REDIRECT,
  AUTHZ_REDIRECT,
  ORIGINS,
};
