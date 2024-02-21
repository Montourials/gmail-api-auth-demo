import Root from "./_root/Root.jsx";
import { SignedOut } from "./auth/__index.js";
import { AuthzRedirect, CodeCallback } from "./authz/__index.js";
import { PageNotFound, ErrorPage } from "./misc/__index.js";

import AppInfo from "./app-info/AppInfo.jsx";
import Profile from "./profile/Profile.jsx";
import Senders from "./senders/Senders.jsx";
import Welcome from "./welcome/Welcome.jsx";

export default {
  Root,

  Profile,
  SignedOut,

  AuthzRedirect,
  CodeCallback,

  PageNotFound,
  ErrorPage,

  AppInfo,
  Senders,
  Welcome,
};
