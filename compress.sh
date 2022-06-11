#!/bin/bash
find ../docs/ -name '*.png' -exec mogrify -resize 1920 -format jpg -quality 20\> {} \;
find ../docs/ -name '*.jpg' -exec mogrify -resize 1920 -format jpg -quality 20\> {} \;
find ../docs/ -name '*.jpeg' -exec mogrify -resize 1920 -format jpg -quality 20\> {} \;
find ../docs/ -name '*.tiff' -exec mogrify -resize 1920 -format jpg -quality 20\> {} \;
find ../docs/ -name '*.webp' -exec mogrify -resize 1920 -format jpg -quality 20\> {} \;

find ../docs/ -type f \( -name \*jpeg -o -name \*png -o -name \*tiff -o -name \*webp \) -delete