#!/bin/bash -e

## prevent runing script outside the repo root
script='scripts/release.sh'
! [[ -x $script ]] &&
  echo >&2 "Please run $script from the repo root" &&
  exit 1

## run the build
npm run build

## run nvm test
./scripts/nvm-test.sh

## get the current version from package
current_version=$(node --print "require('./package').version")

## read the version update type
echo "Current version is '$current_version'"
echo "Update type: <version> | (pre)major | (pre)minor | (pre)patch | prerelease | from-git"
printf "Which update type is ? "
read update_type

## update package version (disable git-tag-version, will be done after)
version=$(npm --no-git-tag-version version $update_type)
echo "New version is $version"

## add and commit unstaged changes
git add --all
git commit --allow-empty -am "release $update_type (from $current_version)"

## create tag version
git tag -a "$version" -m "version $version"

## push to origin with tag
git push --follow-tag origin master

## publish to npm
npm publish
