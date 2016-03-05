#!/bin/bash
NOW=$(date)

echo "$NOW -> Hugo Compiling"
hugo -D --config="config.toml"

echo "$NOW -> Commiting compiled"
cd public
git add .
git commit -a -m "Publish $NOW"

echo "$NOW -> Pushing compiled site"
git push -f origin master
