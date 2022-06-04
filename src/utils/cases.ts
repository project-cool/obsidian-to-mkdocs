import { logger } from "./logger";

export class Cases {

    /**
     * ![[Gatsby|Gatsby Renamed]] => [[Gatsby|Gatsby Renamed]]
     * ![[attachments/Pasted image 20220514110209.png]] => ![[attachments/Pasted image 20220514110209.png]]
    */
    static processBacklinkWithExclamationIfNotImage = (file: string): string => {
        const regex = /!\[\[(.+)\]\]/g;
        const matches = file.match(regex);
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.tiff']
        let newFile = file;

        if (matches) {
            for (const match of matches) {
                if (!imageExtensions.some((extension) => match.includes(extension))) {
                    logger.debug(`processBacklinkWithExclamationIfNotImage >> Replacing ${match} with ${match.slice(1)}`);
                    newFile = newFile.replace(match, match.slice(1));
                }
            }
        }
        return newFile;
    }

    /**
     * [Hugo Theme](https://www.youtube.com/watch?v=hjD9jTi_DQ4)\n => [Hugo Theme](https://www.youtube.com/watch?v=hjD9jTi_DQ4)  \n
     * This is [Hugo Theme](https://www.youtube.com/watch?v=hjD9jTi_DQ4)\n => This is [Hugo Theme](https://www.youtube.com/watch?v=hjD9jTi_DQ4)  \n
     * [Hugo Theme](https://www.youtube.com/watch?v=hjD9jTi_DQ4)  \n => [Hugo Theme](https://www.youtube.com/watch?v=hjD9jTi_DQ4)  \n
     * [Hugo Theme](https://www.youtube.com/watch?v=hjD9jTi_DQ4) this is the best => [Hugo Theme](https://www.youtube.com/watch?v=hjD9jTi_DQ4) this is the best
    */
    static fixLinkSpacing = (file: string): string => {
        const regex = /(\[(.+)\]\((.+)\)[\n\r])|(\[(.+)\]\((.+)\)( +)[\n\r])/g;
        const links = file.match(regex);
        let newFile = file;

        if (links) {
            for (const link of links) {
                logger.debug(`fixLinkSpacing >> Replacing ${link} with ${link}  \n`);
                newFile = newFile.replace(link, `${link.slice(0, -1)}  \n`)
            }
        }
        return newFile;
    }

    /**
     * [[Gatsby|Gatsby Renamed]]\n => [[Gatsby|Gatsby Renamed]]  \n
     * [[Gatsby#Themes]] \n => [[Gatsby#Themes]]  \n
     * [[Gatsby#Themes]] => [[Gatsby#Themes]]
    */
     static fixBacklinkSpacing = (file: string): string => {
        const regex = /(\[\[(.+)\]\]( +)[\n\r])|(\[\[(.+)\]\][\n\r])/g;
        const links = file.match(regex);
        let newFile = file;

        if (links) {
            for (const link of links) {
                logger.debug(`fixBacklinkSpacing >> Replacing ${link} with ${link}  \n`);
                newFile = newFile.replace(link, `${link.slice(0, -1)}  \n`)
            }
        }
        return newFile;
    }

    /**
     * ![[attachments/Pasted image 20220510203344.png]] => ![attachments/Pasted image 20220510203344.png](../attachments/Pasted%20image%2020220510203344.png)
    */
     static processImages = (file: string): string => {
        const regex = /\!\[\[(.+)\]\]/g;
        const images = file.match(regex);
        let newFile = file;

        if (images) {
            for (const image of images) {
                const processedImage = `![${image.slice(3, -2)}](../${encodeURI(image.slice(3, -2))})`
                logger.debug(`processImages >> Replacing ${image} with ${processedImage}`);
                newFile = newFile.replace(image, processedImage);
            }
        }
        return newFile;
    }

    /**
     * [[Gatsby]] => [Gatsby](../Gatsby)  
     * [[Gatsby#^e967b3]] => [Gatsby](../Gatsby)  
     * [[Gatsby#^e967b3| Static Test]] => [ Static Test](../Gatsby)  
     * [[Gatsby|Gatsby Renamed]] => [Gatsby Renamed](../Gatsby)  
     * [[Gatsby#Themes]] => [Gatsby ⮕ Themes](../Gatsby#themes)   
     * [[Gatsby#Themes|Gatsby ka themes]] => [Gatsby ka themes](../Gatsby#themes)  
    */
    static processBacklinks = (file: string) => {
        let newFile = file;

        const regex = /\[\[(.+)\]\]/g;
        const backlinks = file.match(regex)

        const slugifyAnchorLink = (link: string): string => {
            return link.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

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
                    const slugifiedPart = slugifyAnchorLink(decodeURI(slugifySplit[1]));
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
}