import fs from "fs";
import {  dirIterator, logger, ObsidianToMkdocsConverter } from "./utils";

const obsidianFolder = "/Users/arkalim/Documents/Projects/notes/docs";

// get file paths for all the MD files
const filePaths = dirIterator(obsidianFolder);

for (const filePath of filePaths) {
  logger.debug(`Processing filePath: ${filePath}`);

  // reading file at filePath
  fs.readFile(filePath, "utf-8", (err, file) => {
    if (err) {
      logger.error(`Failed to read file at filepath ${filePath} | Error: ${err}`);
      return;
    }

    logger.debug(`Read file at filepath: ${filePath}`)
    const newFile = ObsidianToMkdocsConverter.convert(file);
    logger.debug(`Processed file at filepath: ${filePath}`)

    // overwriting file at filepath
    fs.writeFile(filePath, newFile, "utf-8", (err) => {
      if (err) {
        logger.error(`Failed to write file at filepath ${filePath}`, err);
      }
    });
  });
}
