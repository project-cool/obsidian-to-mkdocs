#!/bin/bash

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [error]: $1"
}

if [ -z $1 ]; then
    log "Please provide docs path"
    exit 1
fi
docsPath=$1
resolution=$2
pressionQuality=$3

find $docsPath -name '*.png' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \;
find $docsPath -name '*.jpg' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \;
find $docsPath -name '*.jpeg' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \;
find $docsPath -name '*.tiff' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \;
find $docsPath -name '*.webp' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \;

time find $docsPath -name '*.png' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \; 
echo -e "\n"
time find $docsPath -name '*.jpg' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \; 
echo -e "\n"
time find $docsPath -name '*.jpeg' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \;
echo -e "\n"
time find $docsPath -name '*.tiff' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \;
echo -e "\n"
time find $docsPath -name '*.webp' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \;
echo -e "\n"
echo "xargs----"
time find $docsPath -name '*.png' | xargs -I % mogrify -resize $resolution -format jpg -quality $compressionQuality % 

time find $docsPath -name '*.jpg' | xargs -I % mogrify -resize $resolution -format jpg -quality $compressionQuality % 

time find $docsPath -name '*.jpeg' | xargs -I % mogrify -resize $resolution -format jpg -quality $compressionQuality % 

time find $docsPath -name '*.tiff' | xargs -I % mogrify -resize $resolution -format jpg -quality $compressionQuality % 

time find $docsPath -name '*.webp' | xargs -I % mogrify -resize $resolution -format jpg -quality $compressionQuality % 

find $docsPath -type f \( -name \*jpeg -o -name \*png -o -name \*tiff -o -name \*webp \) -delete