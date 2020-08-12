#!/bin/bash

export JEKYLL_VERSION=4.1.0
rm -rf .sass-cache/
docker run --rm --volume="$PWD:/srv/jekyll" -p 4000:4000 -it jekyll/builder:$JEKYLL_VERSION jekyll serve --watch --drafts