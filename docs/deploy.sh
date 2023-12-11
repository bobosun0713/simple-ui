#!/usr/bin/env sh

set -e

rm -rf ./dist

pnpm docs:build

cd ./dist

if [ ! -d ".git" ]; then
  git init
fi

git add -A
git commit -m 'deploy'

git push -f git@github.com:bobosun0713/simple-ui.git  master:gh-pages

cd -
