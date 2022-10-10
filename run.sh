#!/bin/bash

export JEKYLL_VERSION=4
rm -rf .sass-cache/
docker run --rm -it --volume="$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll:$JEKYLL_VERSION jekyll serve --watch --drafts