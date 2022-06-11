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

curl -H "Content-Type: application/zip" \
     -H "Authorization: Bearer ${token}" \
     --data-binary "@${docsPath}.zip" \
     https://api.netlify.com/api/v1/sites/$siteId/deploys > /dev/null

echo -e "\nSuccessfully uploaded files to Netlify"

# ./scripts/upload.sh "/Users/arkalim/Documents/Projects/notes/docs" "a157901a-413a-42c4-873d-c04d256ce2b8" "gtnoI3u0hGeUmOTISm8fV-FLRF0FVpmJLNbh5KevkEo"