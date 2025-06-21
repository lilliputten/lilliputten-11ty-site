#!/bin/bash
# @desc Publish (and make if absent) publish build
# @changed 2025.06.21, 03:34

scriptsPath=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")
rootPath=`dirname "$scriptsPath"`
prjPath="$rootPath" # `pwd`

# Import config variables (expected variable `$PUBLISH_FOLDER`)...
test -f "$scriptsPath/config.sh" && . "$scriptsPath/config.sh"

# Check basic required variables...
test -f "$scriptsPath/config-check.sh" && . "$scriptsPath/config-check.sh" --omit-publish-folder-check

DIST_REPO=`git config --get remote.origin.url`

VERSION=`cat "$rootPath/$VERSION_FILE"`
PROJECT_INFO=`cat "$rootPath/$PROJECT_INFO_FILE"`

echo "Publishing build $PROJECT_INFO..."

# Alternate way to init the publish folder: copy `.git`, chackout a branch and
# simulate the submodule in: ".gitmodules" ".git/modules/$PUBLISH_FOLDER"

# pnpm install
# pnpm build
touch .gitmodules
git submodule add -f -b "$PUBLISH_BRANCH" "$DIST_REPO" "$PUBLISH_FOLDER"
# . "$scriptsPath/publish.sh"
