#!/bin/bash
NOW=$(date)

echo "$NOW -> Commiting compiled"
git add .
git commit -a -m "Publish $NOW"

echo "$NOW -> Pushing compiled site"
git push -f origin master
