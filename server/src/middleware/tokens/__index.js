import _checkSessionToken from "./check-session-token.js";
import _storeNewTokens from "./store-new-tokens.js";

export const { checkSessionToken } = _checkSessionToken;
export const { storeNewTokens } = _storeNewTokens;

export default {
  checkSessionToken,
  storeNewTokens,
};
