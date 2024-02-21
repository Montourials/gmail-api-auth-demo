import abstractions from "./abstractions/abstractions.js";
import helpers from "./helpers/__index.js";
import services from "./services/__index.js";

export const { emailDb, userDb } = abstractions;
export const { connectToDb } = helpers;
export const { createNewUser } = services;

export default {
  abstractions,
  helpers,
  services,
};
