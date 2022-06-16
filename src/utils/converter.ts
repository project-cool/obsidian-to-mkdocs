import { Cases } from './cases';
import { Compressor } from './compressor';
// import { logger } from './logger'

export class ObsidianToMkdocsConverter {
    static convert = (file: string) => {
        let convertedFile = file;
        convertedFile = Compressor.changeImageExtension(convertedFile) // no
        convertedFile = Cases.processBacklinkWithExclamationIfNotImage(convertedFile) // no
        convertedFile = Cases.fixLinkSpacing(convertedFile) // no
        convertedFile = Cases.fixBacklinkSpacing(convertedFile) // no
        convertedFile = Cases.processImages(convertedFile) // yes
        convertedFile = Cases.processBacklinks(convertedFile) // yes
        convertedFile = Cases.processAdmonitions(convertedFile) // yes
        return convertedFile;
    }
}
