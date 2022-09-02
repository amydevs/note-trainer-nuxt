#!/usr/bin/env sh

# abort on errors
set -e

# set origin url
ORIGIN=$(git remote get-url origin)

# build
yarn build
yarn generate

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f $ORIGIN master:gh-pages

cd -
