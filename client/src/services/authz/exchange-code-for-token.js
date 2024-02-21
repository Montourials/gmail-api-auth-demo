import axios from "axios";

import { buildServerUrl, getSessionToken } from "src/util/__index.js";

export default async function exchangeCodeForToken({ code, session = null }) {
  const url = buildServerUrl("authz", "token");

  const existingAuthHeader = axios.defaults.headers.common["Authorization"];

  const Authorization = session ?? existingAuthHeader ?? getSessionToken();

  if (!Authorization) {
    throw new Error("could not make token exchange: no session token");
  }

  const res = await axios.post(
    url,
    {
      code,
    },
    {
      headers: {
        "X-Requested-With": "XmlHttpRequest",
        Authorization,
      },
    }
  );

  return res.data;
}
