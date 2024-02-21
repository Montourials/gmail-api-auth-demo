import { mkdirSync, statSync, chmodSync, existsSync } from "node:fs";

///If we expect a file and find nothing, throw the proper error. If we don't expect a file, we expect a directory.
///If we expect a directory and find nothing, create it.
///If we find something, ensure it's read and writable.
export const ensurePathAccess = ({ path, expectsFile = true }) => {
  const exists = existsSync(path);

  if (!exists) {
    if (expectsFile) {
      throw new Error(`no file found: [${path}]`);
    }

    mkdirSync(path, { mode: 0o666, recursive: true });

    return;
  }

  const { readable, writable } = _getFilePermissions(path);

  if (!readable || !writable) {
    chmodSync(file.path, 0o666);
  }
};

const _getFilePermissions = (path) => {
  const fileStats = statSync(path);

  //fileStats.mode - represents the file's permissions in the form of a numeric value
  //& - bitwise AND operator
  //0o prefix - indicates that the number is an octal number
  const readable = (fileStats.mode & 0o444) !== 0;
  const writable = (fileStats.mode & 0o222) !== 0;

  return {
    readable,
    writable,
  };
};

export default {
  ensurePathAccess,
};
