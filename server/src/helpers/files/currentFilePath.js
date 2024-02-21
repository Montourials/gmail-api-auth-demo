import { fileURLToPath } from "url";
import { resolve } from "path";

///This function should be avoided - brittle (will break if we name our folder anything other than "server") and questionable
export function currentFilePath() {
  const stackSplit = new Error().stack.split("\n")[2].split(" ");

  //Captures the path starting from 'server', and also the line and column numbers for the error (currently unused)
  const re = /\(file:\/\/\/.*\/(server\/[^:]+):(\d+):(\d+)\)/;

  let matchFound;
  let path = "";

  stackSplit.forEach((string) => {
    if (matchFound) return;

    const match = string.match(re);

    if (match) {
      matchFound = true;
      path = match[1];
    }
  });

  return matchFound ? path : "Filename not found";
}
