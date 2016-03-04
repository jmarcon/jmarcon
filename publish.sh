#!/bin/bash
NOW=$(date)

echo "$NOW -> Commiting Source"
git add .
git commit -a -m "Publish source $NOW"

echo "$NOW -> Pushing source"
git push -f origin master

echo "$NOW -> Hugo Compiling"
hugo -D -t hugo-geo

echo "$NOW -> Commiting compiled"
cd public
git add .
git commit -a -m "Publish $NOW"

echo "$NOW -> Pushing compiled site"
git push -f origin master
