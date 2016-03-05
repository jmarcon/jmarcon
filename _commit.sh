#!/bin/bash
NOW=$(date)

echo "$NOW -> Commiting Source"
git add .
git commit -a -m "Publish source $NOW"

echo "$NOW -> Pushing source"
git push -f origin master
