import { promises as fs } from "fs";

export async function parseFile(path) {
  try {
    const content = await fs.readFile(path);
    return JSON.parse(content);
  } catch (e) {
    console.error(e);
  }
}

export default { parseFile };
