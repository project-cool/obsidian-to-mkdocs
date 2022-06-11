#! /bin/bash

rm -rf "~/Documents/Projects/notes/docs"
cp -a "~/Documents/Obsidian/Obsidian Vault/Notes/" "~/Documents/Projects/notes/docs"

"echo \"\" > ./logs/dev.log && echo \"\" > ./logs/errors.log"

npm run start $1

./scripts/compress.sh $1