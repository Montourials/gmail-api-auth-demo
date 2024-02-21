const uris = {
  root: "/",

  login: "/login",
  signout: "/signout",

  authzStart: "/authz/start",
  authzCallback: "/authz", //only used in dev
  unauthorized: "/authz/fail",

  welcome: "/welcome",
  appInfo: "/info",
  profile: "/profile",
  senders: "/senders",
};

export default { uris, ...uris };
