#!/bin/bash

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [error]: $1"
}

if [ -z $1 ]; then
    log "Please provide docs path"
    exit 1
fi
docsPath=$1

mkdocs build # /app/docs => /app/site

rm -rf /app/docs

mv /app/site /app/docs