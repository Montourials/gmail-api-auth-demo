import { dbAbstraction } from "./dbAbstraction.js";

import models from "../models/__index.js";
const { Email, User } = models;

export const emailDb = dbAbstraction(Email);
export const userDb = dbAbstraction(User);

export default {
  emailDb,
  userDb,
};
