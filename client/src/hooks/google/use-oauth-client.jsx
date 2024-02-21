import { useCallback, useRef, useState } from "react";

import { CLIENT_ID, SCOPES } from "src/config/__index.js";

import useGoogle from "./_use-google.jsx";

///Return functions that enable using google's oauth library without worrying about the initialization state of the clients
export default function useOAuthClient() {
  const { oauth } = useGoogle("oauth");

  const codeClient = useRef(null);
  const tokenClient = useRef(null);

  const log = (e) => console.error("oauth error", e);

  const _initParams = (callback, errorCallback) => {
    return {
      client_id: CLIENT_ID,
      scope: SCOPES.gmail,
      callback,
      error_callback: errorCallback,
    };
  };

  const getCode = useCallback(
    (handleCodeResponse, handleError = log) => {
      let client = codeClient.current;

      if (!client) {
        const params = _initParams(handleCodeResponse, handleError);
        client = oauth.initCodeClient(params);
      }

      client.requestCode();
      codeClient.current = client;
    },
    [oauth]
  );

  const getToken = useCallback(
    (handleTokenResponse, handleError = log) => {
      let client = tokenClient.current;

      if (!client) {
        const params = _initParams(handleTokenResponse, handleError);
        client = oauth.initTokenClient(params);
      }

      tokenClient.current = client;
      client.requestAccessToken();
    },
    [oauth]
  );

  const hasGrantedAllScopes = useCallback(
    (token, scope, otherScopes = []) => {
      return oauth?.hasGrantedAllScopes(token, scope, otherScopes);
    },
    [oauth]
  );

  const hasGrantedAnyScope = useCallback(
    (token, scope, otherScopes = []) => {
      return oauth?.hasGrantedAnyScope(token, scope, otherScopes);
    },
    [oauth]
  );

  const revokeAllScopes = useCallback(
    (token, callback) => {
      oauth?.revoke(token, callback);
    },
    [oauth]
  );

  return {
    getCode,
    getToken,

    hasGrantedAllScopes,
    hasGrantedAnyScope,
    revokeAllScopes,
  };
}
