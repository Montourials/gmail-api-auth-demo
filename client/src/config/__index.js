import clients from "./clients.js";
import envG from "./env-g.js";
import serverConfig from "./server-config.js";
import siteConfig from "./site-config.js";
import pageUris from "./uris.js";

export const {
  GCLIENT,

  GIS, //Google Identity Services (authentication)
  OAUTH, //Google OAuth Services (authorization)
} = clients;

export const { CLIENT_ID, SCOPES } = envG;

export const { serverUrl, apis, methodPaths } = serverConfig;
export const { BASE_URL, SESSION_TOKEN } = siteConfig;

export const {
  uris,

  root,
  signout,
  authzStart,
  authzCallback,
  unauthorized,
  welcome,
  appInfo,
  login,
  profile,
  senders,
} = pageUris;

export default {
  clients,
  envG,
  serverConfig,
  siteConfig,
  uris,
};
