import auth from "./auth/__index.js";
import authz from "./authz/__index.js";
import _makeRequest from "./make-request.jsx";

export const { login } = auth;
export const { exchangeCodeForToken, getAuthzUrl } = authz;
export const makeRequest = _makeRequest;

export default {
  auth,
  authz,
  makeRequest,
};
