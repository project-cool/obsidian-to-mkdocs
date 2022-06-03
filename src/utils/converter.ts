import { logger } from './logger'

export class ObsidianToMkdocsConverter {

    static findBacklinkAndImageRegex = /(\[\[(.+)\]\]|\!\[\[(.+)\]\])[\n\r]/g;
    static findBacklinkRegex = /\[\[(.+)\]\]/g;

    static convert = (file: string) => {
        let convertedFile = ObsidianToMkdocsConverter.fixBacklinkSpacing(file)
        convertedFile = ObsidianToMkdocsConverter.convertBacklinksAndImages(convertedFile)
        convertedFile = ObsidianToMkdocsConverter.convertAdmonitions(convertedFile)
        return convertedFile;
    }

    private static fixBacklinkSpacing = (file: string) => {
        let newFile = file;
        const backlinksAndImages = file.match(ObsidianToMkdocsConverter.findBacklinkAndImageRegex);
        if (backlinksAndImages) {
            for (const match of backlinksAndImages) {
                if (!match.startsWith('!')) {
                    newFile = newFile.replace(match, `${match}<br>`)
                }
            }
        }
        return newFile;
    }

    private static slugifyAnchorLink = (link: string): string => {
        return link.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    private static convertBacklinksAndImages = (file: string) => {
        let newFile = file;

        const backlinks = file.match(ObsidianToMkdocsConverter.findBacklinkRegex)

        if (backlinks) {
            for (const backlink of backlinks) {
                logger.debug(`Processing backlink: ${backlink}`);
                let backlinkCopy = backlink;

                // remove ^ part
                if (backlink.includes('#^')) {
                    const startIndex = backlink.indexOf('#')
                    let endIndex = 0
                    if (!backlink.includes('|')) {
                        endIndex = backlink.indexOf(']')
                    } else {
                        endIndex = backlink.indexOf('|')
                    }
                    const toBeRemoved = backlink.slice(startIndex, endIndex);
                    backlinkCopy = backlink.replace(toBeRemoved, '')
                }

                // convert backlinks
                const backlinkContentSplit = backlinkCopy.slice(2, -2).split('|');
                let backlinkToReplace: string;
                if (backlinkContentSplit.length === 2) {
                    backlinkToReplace = `[${backlinkContentSplit[1]}](../${encodeURI(backlinkContentSplit[0])})`
                } else {
                    backlinkToReplace = `[${backlinkContentSplit[0].replace('#', ' ⮕ ')}](../${encodeURI(backlinkContentSplit[0])})`
                }
                logger.debug(`Converted backlink: ${backlinkToReplace}`);

                // slugify
                const slugifySplit = backlinkToReplace.slice(1, -1).split('#');
                if (slugifySplit.length === 2) {
                    const slugifiedPart = ObsidianToMkdocsConverter.slugifyAnchorLink(decodeURI(slugifySplit[1]));
                    backlinkToReplace = `[${slugifySplit[0]}#${slugifiedPart})`
                }
                logger.debug(`Slugified backlink: ${backlinkToReplace}`);

                // replace backlink in the file
                newFile = newFile.replace(backlink, backlinkToReplace);
            }
            return newFile;
        }
        return newFile;
    }

    private static convertAdmonitions = (file: string) => {
        return file;
    }
}
