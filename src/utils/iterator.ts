import fs from "fs";
import path from "path";
import { logger } from "./logger";

const validateFile = (dirName: string, fileName: string): boolean => {
  if (fileName.startsWith(".")) {
    logger.info(
      `Filename at ${path.join(dirName, fileName)} starts with (.) ignoring...`
    );
    return false;
  }
  if (
    fileName === "attachments" ||
    fileName === "assets" ||
    fileName === "stylesheets"
  ) {
    logger.info(
      `Filename at ${path.join(
        dirName,
        fileName
      )} equals attachments, ignoring...`
    );
    return false;
  }
  return true;
};

export function* dirIterator(dir: string): Generator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (validateFile(dir, file.name)) {
      if (file.isDirectory()) {
        yield* dirIterator(path.join(dir, file.name));
      } else {
        yield path.join(dir, file.name);
      }
    }
  }
}
