import _getCookie from "./get-cookie.js";
import _isStorageAvailable from "./is-storage-available.js";
import sessionTokens from "./session-tokens.js";
import userStatus from "./user-status.js";

export const getCookie = _getCookie;
export const isStorageAvailable = _isStorageAvailable;

export const {
  getSessionToken,
  setSessionToken,
  clearSessionToken,
  isTokenAcceptable,
} = sessionTokens;

export const { statuses, getUserStatus, setUserStatus, clearUserStatus } =
  userStatus;

export default {
  getCookie,
  isStorageAvailable,
  ...sessionTokens,
  ...userStatus,
};
