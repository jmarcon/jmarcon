#!/bin/bash
rm -rf .sass-cache/
export BUILDKIT_PROGRESS=plain
docker build -t website:latest .
docker run --rm -it --volume="$PWD:/srv/jekyll" -p 4000:4000 website:latest