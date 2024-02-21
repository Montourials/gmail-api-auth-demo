import { existsSync, renameSync } from "node:fs";

import { normalError } from "../general/normalError.js";

export function renameFile(oldPath, newPath) {
  if (!oldPath || !newPath) {
    throw new Error("could not rename file, missing argument(s)");
  }

  if (oldPath === newPath) {
    console.log("could not rename file, given arguments are identical");
    return;
  }

  if (!existsSync(oldPath)) {
    throw new Error("Cannot rename: file does not exist");
  }

  if (existsSync(newPath)) {
    throw new Error(`A file already exists at the given path`);
  }

  try {
    renameSync(oldPath, newPath);
  } catch (e) {
    normalError(e);
  }
}

export default {
  renameFile,
};
