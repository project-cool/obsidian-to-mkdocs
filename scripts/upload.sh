#! /bin/bash

if [ -z $1 ]; then
    echo "Please provide docs path"
    exit 1
fi
docsPath=$1

if [ -z $2 ]; then
    echo "Please provide Netlify Site ID"
    exit 1
fi
siteId=$2

if [ -z $3 ]; then
    echo "Please provide Netlify Personal Access Token"
    exit 1
fi
token=$3

echo -e "\nCompressing files to upload to Netlify"

zip -r -q $docsPath.zip $docsPath

echo -e "\nUploading files to Netlify"

node /app/code/scripts/upload.mjs $docsPath $siteId $token

echo -e "\nSuccessfully uploaded files to Netlify"