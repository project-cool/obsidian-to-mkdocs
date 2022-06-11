import { logger } from "./logger";

export class Compressor {
    /**
     * ![[attachments/Pasted image 20220510203344.png]] => ![[attachments/Pasted image 20220510203344.jpg]] 
    */
     static changeImageExtension = (file: string): string => {
        const regex = /\!\[\[(.+)\]\]/g;
        const images = file.match(regex);
        let newFile = file;

        if (images) {
            for (const image of images) {
                const imageWithJpgExtension = `${image.split('.').slice(0, -1).join('.')}.jpg]]`
                logger.debug(`imageWithJpgExtension >> Replacing ${image} with ${imageWithJpgExtension}`);
                newFile = newFile.replace(image, imageWithJpgExtension);
            }
        }
        return newFile;
    }
}