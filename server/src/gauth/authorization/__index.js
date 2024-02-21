import _generateAuthUrl from "./generate-auth-url.js";
import _getToken from "./get-token.js";

export const { generateAuthUrl } = _generateAuthUrl;
export const { getToken } = _getToken;

export default {
  generateAuthUrl,
  getToken,
};
