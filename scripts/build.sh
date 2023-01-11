#!/bin/bash

log() {
	echo "[$(date '+%Y-%m-%d %H:%M:%S')] [error]: $1"
}

if [ -z $1 ]; then
	log "Please provide docs path"
	exit 1
fi
docsPath=$1

# if [ $2 == "true" ]; then
#     mkdocs build 2> /dev/null # /app/docs => /app/site
# else
#     mkdocs build
# fi
#
# if [ $? -eq 1 ]; then
#     log "MkDocs failed to build website"
#     exit 1
# fi

mkdocs build

rm -rf /app/docs

mv /app/site /app/docs
