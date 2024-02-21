import { userDb } from "../abstractions/abstractions.js";

export async function createNewUser(userId) {
  if (!userId) {
    throw new Error("no userId given");
  }

  const existingUser = await userDb.findOne({ userId });
  const isNewUser = !existingUser;

  const user = isNewUser
    ? await userDb.insert({
        userId,
      })
    : existingUser;

  return { user, isNewUser };
}

export default { createNewUser };
