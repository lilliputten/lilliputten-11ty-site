#!/bin/bash
# @desc Check basic required variables
# @changed 2025.06.21, 03:15

scriptsPath=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")
rootPath=`dirname "$scriptsPath"`
prjPath=`pwd`

ARGS="$*"

# NOTE 2024.11.20, 03:32 -- Those params aren't used: use derived (from git etc) values instead
if [ -z "$PUBLISH_BRANCH" ]; then
  echo "Repository branch isn't specified. See 'PUBLISH_BRANCH' parameter in 'config.sh'"
  exit 1
fi
if [ -z "$PUBLISH_FOLDER" ]; then
  echo "Publish folder isn't specified. See 'PUBLISH_FOLDER' parameter in 'config.sh'"
  exit 1
fi

# Check publish folder if parameter '--omit-publish-folder-check' isn't specified...
if [ ! -d "$prjPath/$PUBLISH_FOLDER" ]; then
  # if [ ! -z "${ARGS##*--omit-publish-folder-check*}" ]; then # NOTE: Doesn't work
  if [[ ! "$ARGS" =~ .*--omit-publish-folder-check.* ]]; then
    echo "No publish folder. Probably submodule was not initialized. Use script 'publish-init.sh'."
    exit 1
  fi
fi
