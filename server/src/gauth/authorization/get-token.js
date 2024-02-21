import { generateAuthUrl } from "./generate-auth-url.js";

export async function getToken(authClient) {
  const authUrl = generateAuthUrl(authClient);
  const token = await authClient.request({ url: authUrl });
  const tokenInfo = await authClient.getTokenInfo(
    authClient.credentials.access_token
  );

  return { token, tokenInfo };
}

export default { getToken };
