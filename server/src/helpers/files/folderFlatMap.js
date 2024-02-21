import { existsSync, readdirSync, statSync } from "node:fs";
import { resolve as resolvePath, join } from "node:path";

import { normalError } from "../general/normalError.js";

//TODO: Set a maximum file limit and restrain this function based upon that
/*Recursively maps every file that is contained within a given directory
Expects:
  -dir<String>: the directory to recursively search
  -options: {
    resolve<Bool>: Are we expecting a string to use path.resolve on, or an already resolved path?
  }
Outcome:
  -Returns null if folder does not exist
  -Returns an array of files if folder exists and mapping is successful
  -Throws upon mapping failure
*/
export function folderFlatMap(dir = "images", { resolve } = { resolve: true }) {
  const folder = resolve ? resolvePath(dir) : dir;

  if (!existsSync(folder)) return null;

  try {
    return _recurse({
      folder,
    });
  } catch (e) {
    normalError(e);
  }
}

function _recurse({ folder }) {
  const files = readdirSync(folder);

  let fileMap = [];

  for (const file of files) {
    const filePath = join(folder, file);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      const subFolderFiles = _recurse(filePath, ignorePath);
      fileMap = fileMap.concat(subFolderFiles);
    } else {
      fileMap.push({
        filename: file,
        path: filePath,
      });
    }
  }

  return fileMap;
}

export default {
  folderFlatMap,
};
