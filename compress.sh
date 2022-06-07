find . -name '*.png' -exec mogrify -resize 1920 -format jpg -quality 20\> {} \;
find . -name '*.jpg' -exec mogrify -resize 1920 -format jpg -quality 20\> {} \;
find . -name '*.jpeg' -exec mogrify -resize 1920 -format jpg -quality 20\> {} \;
find . -name '*.tiff' -exec mogrify -resize 1920 -format jpg -quality 20\> {} \;
find . -name '*.webp' -exec mogrify -resize 1920 -format jpg -quality 20\> {} \;

find . -type f \( -name \*jpeg -o -name \*png -o -name \*tiff -o -name \*webp \) -delete