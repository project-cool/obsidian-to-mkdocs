import fs from "fs";
import fm from "front-matter";
import { dirIterator, logger, ObsidianToMkdocsConverter } from "./utils";
import { FrontMatter } from "./types";

const obsidianFolder = process.argv[2]; // path argument

logger.info(`Obsidian folder path: ${obsidianFolder}`);

// get file paths for all the MD files
const filePaths = dirIterator(obsidianFolder);

for (const filePath of filePaths) {
  logger.debug(`Processing filePath: ${filePath}`);

  // reading file at filePath
  fs.readFile(filePath, "utf-8", (err, file) => {
    if (err) {
      logger.error(
        `Failed to read file at filepath ${filePath} | Error: ${err}`
      );
      return;
    }

    logger.debug(`Read file at filepath: ${filePath}`);

    // check if the file is hidden
    const frontMatter = fm(file).attributes as FrontMatter;
    if (frontMatter.hidden) {
      logger.debug(`File at filepath: ${filePath} is hidden, deleting file...`);
      fs.unlinkSync(filePath);
    } else {
      const newFile = ObsidianToMkdocsConverter.convert(file);
      logger.debug(`Processed file at filepath: ${filePath}`);

      // overwriting file at filepath
      fs.writeFile(filePath, newFile, "utf-8", (err) => {
        if (err) {
          logger.error(`Failed to write file at filepath ${filePath}`, err);
        }
      });
    }
  });
}

logger.info("Compressing images to JPEG");
