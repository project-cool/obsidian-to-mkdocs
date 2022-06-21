#! /bin/bash

rm -rf "/Users/arkalim/Documents/Projects/notes/docs"
cp -a "/Users/arkalim/Documents/Obsidian/obsidian-vault/Notes" "/Users/arkalim/Documents/Projects/notes/docs"

"echo \"\" > ./logs/dev.log && echo \"\" > ./logs/errors.log"

npm run start $1

./scripts/compress.sh $1 1920 20