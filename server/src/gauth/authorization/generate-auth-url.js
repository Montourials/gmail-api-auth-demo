import { SCOPES } from "../../config/__index.js";

export async function generateAuthUrl(authClient, scope = SCOPES.gmail) {
  return authClient.generateAuthUrl({
    access_type: "offline",
    scope,
  });
}

export default { generateAuthUrl };
