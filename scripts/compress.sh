#!/bin/bash

if [ -z $1 ]; then
    echo "Please provide docs path"
    exit 1
fi
docsPath=$1

if [ -z $2 ]; then
    echo "Image resize resolution not provided, using default: 1920"
    resolution="1920"
else 
    resolution=$2
fi

if [ -z $3 ]; then
    echo "Image compression quality not provided, using default: 20"
    compressionQuality="20"
else 
    compressionQuality=$3
fi

find $docsPath -name '*.png' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \;
find $docsPath -name '*.jpg' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \;
find $docsPath -name '*.jpeg' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \;
find $docsPath -name '*.tiff' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \;
find $docsPath -name '*.webp' -exec mogrify -resize $resolution -format jpg -quality $compressionQuality\> {} \;

find $docsPath -type f \( -name \*jpeg -o -name \*png -o -name \*tiff -o -name \*webp \) -delete