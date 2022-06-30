import fm from "front-matter";
import { FrontMatter } from "../types";
import { Cases } from "./cases";
import { Compressor } from "./compressor";
import { logger } from "./logger";

export class ObsidianToMkdocsConverter {
  static convert = (file: string) => {
    let convertedFile = file;
    convertedFile = ObsidianToMkdocsConverter.addFrontMatter(convertedFile); // no

    convertedFile = Compressor.changeImageExtension(convertedFile); // no
    convertedFile =
      Cases.processBacklinkWithExclamationIfNotImage(convertedFile); // no
    convertedFile = Cases.fixLinkSpacing(convertedFile); // no
    convertedFile = Cases.fixBacklinkSpacing(convertedFile); // no
    convertedFile = Cases.processImages(convertedFile); // yes
    convertedFile = Cases.processBacklinks(convertedFile); // yes
    convertedFile = Cases.processAdmonitions(convertedFile); // yes
    return convertedFile;
  };

  static addFrontMatter = (file: string) => {
    const frontMatter = fm(file).attributes as FrontMatter;
    if (frontMatter.updated) {
      try {
        const updateDate = new Date(String(frontMatter.updated));
        const lastUpdatedDate = updateDate.toISOString().split("T")[0];
        file = `${file}\n\n---\n_Last updated: ${lastUpdatedDate}_`;
      } catch (error: unknown) {
        logger.error(
          `Failed to format last updated date, ${error}, ${frontMatter}`
        );
      }
    }
    return file;
  };
}
