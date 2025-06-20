#!/bin/sh
# @desc Pack publish folder
# @changed 2025.05.12, 20:55

scriptsPath=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")
rootPath=`dirname "$scriptsPath"`
prjPath="$rootPath" # `pwd`

# Import config variables (expected variable `$PUBLISH_FOLDER`)...
test -f "$scriptsPath/config.sh" && . "$scriptsPath/config.sh"

# Check basic required variables...
test -f "$rootPath/config-check.sh" && . "$rootPath/config-check.sh"

PRJNAME=`git remote -v  | sed -rn '1s#.*/(.*)\.git.*#\1#p'`

VERSION_PATH="$rootPath/${VERSION_FILE}"
VERSION=`cat "$VERSION_PATH"`
# TIMESTAMP=`date -r "$VERSION_PATH" "+%Y.%m.%d %H:%M:%S %z"`
TIMETAG=`date -r "$VERSION_PATH" "+%y%m%d-%H%M"`

ARCNAME="$PRJNAME-v.$VERSION-$TIMETAG.zip"

echo "Packing publish folder '$PUBLISH_FOLDER' to archive '$ARCNAME'..."

cd "$PUBLISH_FOLDER" && \
  pwd && \
  zip -r "../$ARCNAME" * -x "*_" -x "*.swp"
  cd .. && \
  echo OK
