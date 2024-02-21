import profile from "./profile/__index.js";
import userStatus from "./user-status/__index.js";

export const { ProfileContext, ProfileProvider } = profile; //Google identity/profile
export const { UserStatusContext, UserStatusProvider } = userStatus; //State to keep track of the status for the current visit

export default {
  profile,
  userStatus,
};
