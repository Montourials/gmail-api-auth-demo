import { redirect } from "react-router-dom";

import {
  root,
  welcome,
  appInfo,
  profile,
  senders,
  signout,
  authzStart,
  authzCallback,
  unauthorized,
} from "src/config/__index.js";

import pages from "src/pages/__index.js";
const {
  Root,
  ErrorPage,
  AppInfo,
  Welcome,
  Profile,
  Senders,
  SignedOut,
  AuthzRedirect,
  CodeCallback,
} = pages;

import { getAuthzUrl, exchangeCodeForToken } from "src/services/__index.js";

export default function Router() {
  return [
    {
      path: root,
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: welcome.substring(1),
          element: <Welcome />,
        },
        {
          path: appInfo.substring(1),
          element: <AppInfo />,
        },
        {
          path: profile.substring(1),
          element: <Profile />,
        },
        {
          path: senders.substring(1),
          element: <Senders />,
        },
        {
          path: signout.substring(1),
          element: <SignedOut />,
        },
        {
          path: authzStart.substring(1),
          element: <AuthzRedirect />,
          loader: async () => {
            const url = await getAuthzUrl();

            const isNewUser = window.localStorage.getItem("__gh_isNewUser");

            return isNewUser
              ? redirect(`${url}&prompt=consent`)
              : redirect(url);
          },
        },
        {
          path: authzCallback.substring(1),
          element: <CodeCallback />,
          loader: async ({ request }) => {
            const url = new URL(request.url);
            const code = url.searchParams.get("code");
            const codeScope = url.searchParams.get("scope");

            if (!code || !codeScope) {
              console.error("CodeCallback loader: missing code or scope");
              return redirect(unauthorized);
            }

            const resData = await exchangeCodeForToken({ code });

            if (!resData?.isAuthorized || resData?.scope !== codeScope) {
              return redirect(unauthorized);
            }

            return resData;
          },
        },
      ],
    },
  ];
}
