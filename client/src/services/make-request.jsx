import axios from "axios";

import {
  buildServerUrl,
  getSessionToken,
  setSessionToken,
} from "src/util/__index.js";

export default async function makeRequest({
  router, //eg "senders" or "auth"
  route, //eg "list"
  method, //eg "get" (default)
  data,
  params,
  headers,

  api, //alias for 'router'
  service, //alias for 'route'

  //options
  useSessionToken = true,
  onlyReturnData = true,
  catchErrors = false,
}) {
  const url = buildServerUrl(router ?? api, route ?? service);

  const methodToUse = method ?? "get";

  let authHeader;

  if (useSessionToken) {
    authHeader = getSessionToken();
  }

  try {
    const res = await axios({
      url,
      method: methodToUse,
      data,
      params,
      headers: { Authorization: authHeader, ...headers },
    });

    const newSessionToken = res.headers.newsessiontoken;

    if (newSessionToken) {
      setSessionToken(`Bearer ${newSessionToken}`);
    }

    return onlyReturnData ? res.data : res;
  } catch (e) {
    if (catchErrors) {
      return e;
    } else throw e;
  }
}
