#!/bin/bash -e

## prevent runing script outside the repo root
script='scripts/release.sh'
! [[ -x $script ]] &&
  echo >&2 "Please run $script from the repo root" &&
  exit 1

## get the current version from package
current_version=$(node --print "require('./package').version")

## read the version update type
echo "Current version is '$current_version'"
echo "Update type: <version> | (pre)major | (pre)minor | (pre)patch | prerelease | from-git"
printf "Which update type is ? "
read update_type

## update version
version=$(npm version $update_type)
echo "New version is $version"

## push with tags
git push --follow-tags

## publish to npm
npm publish
