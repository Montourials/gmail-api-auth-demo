import _cssGlobalValues from "./css/global-values.js";
import uris from "./uris/__index.js";
import storage from "./storage/__index.js";

import _asyncForEach from "./async-for-each.js";
import _filterArrayByValues from "./filter-array-by-values.js";
import _makeToast from "./make-toast.js";
import time from "./time.js";

export const { cssGlobalValues } = _cssGlobalValues;
export const { buildPageUrl, buildServerUrl } = uris;
export const {
  getCookie,
  isStorageAvailable,

  getSessionToken,
  setSessionToken,
  clearSessionToken,
  isTokenAcceptable,

  statuses,
  getUserStatus,
  setUserStatus,
  clearUserStatus,
} = storage;

export const { asyncForEach } = _asyncForEach;
export const { filterArrayByValues } = _filterArrayByValues;
export const { makeToast } = _makeToast;
export const {
  msToTime,

  msToHours,
  msToMinutes,
  msToSeconds,
  secondsToMs,
  secondsToMin,
  secondsToHours,
  minutesToMs,
  minutesToSeconds,
  minutesToHours,
} = time;

export default {
  cssGlobalValues,
  buildPageUrl,
  buildServerUrl,

  asyncForEach,
  filterArrayByValues,
  makeToast,

  time,
};
