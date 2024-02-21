const key = "__gmh_userstatus";

export const statuses = {
  firstRender: "first-render", //First render, have not yet checked for session
  fresh: "fresh", //No session token found in localStorage, no profile in context

  loggingIn: "login", //User has clicked the signin button and begun the authentication process
  loggingOut: "logout", //User is currently logging out (will be 'fresh' afterwards)

  //User is authorized to make API requests
  returning: "returning", //Valid session token exists, but no profile information (unnecessary for authz requests)
  loggedIn: "logged-in", //Session token and profile info both available (user has just finished the auth process)
  sendersList: "get-senders-list", //User has asked to retrieve their list of senders
};

export function getUserStatus() {
  return window.localStorage.getItem(key);
}

export function setUserStatus(status) {
  window.localStorage.setItem(key, status);
}

export function clearUserStatus() {
  window.localStorage.removeItem(key);
}

export default {
  statuses,
  getUserStatus,
  setUserStatus,
  clearUserStatus,
};
