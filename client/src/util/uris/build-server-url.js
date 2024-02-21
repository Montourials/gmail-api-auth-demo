import { serverUrl } from "src/config/__index.js";

///Input an API and method name (eg 'auth', 'code') to return a URL (eg 'https://server/profile')
export function buildServerUrl(api, service = "") {
  const baseApi = `${serverUrl}/${api}`;

  if (service) {
    return `${baseApi}/${service}`;
  } else return baseApi;
}

export default {
  buildServerUrl,
};
