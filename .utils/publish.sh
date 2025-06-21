#!/bin/bash
# @desc Publish (and make if absent) publish build
# @changed 2025.06.21, 03:15

scriptsPath=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")
rootPath=`dirname "$scriptsPath"`
prjPath="$rootPath" # `pwd`

# Import config variables (expected variable `$PUBLISH_FOLDER`)...
test -f "$scriptsPath/config.sh" && . "$scriptsPath/config.sh"

# Check basic required variables...
test -f "$scriptsPath/config-check.sh" && . "$scriptsPath/config-check.sh"

# Make build if absent
sh "$scriptsPath/publish-update.sh" || exit 1

VERSION=`cat "$rootPath/$VERSION_FILE"`
PROJECT_INFO=`cat "$rootPath/$PROJECT_INFO_FILE"`

echo "Publishing build $PROJECT_INFO..."

COMMIT_TEXT="Build $PROJECT_INFO"
# echo "Fetch..." && git fetch && git pull && \
cd "$PUBLISH_FOLDER" && \
  echo "Fetch..." && git fetch && git pull -Xours && \
  echo "Add files..." && git add . -Av && \
  echo "Commit..." && git commit -am "$COMMIT_TEXT" && \
  echo "Push basic branch..." && git push && \
  echo "Successfully published build $PROJECT_INFO" && \
  cd ..
