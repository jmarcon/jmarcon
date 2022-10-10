#!/bin/bash

echo "Clonning Repositories (Reveal and Highlighthjs)"
git clone https://github.com/hakimel/reveal.js.git tmp/reveal
git clone https://github.com/highlightjs/cdn-release tmp/highlight

echo "Cleaning Reveal folder"
rm -rf assets/reveal

echo "Installing Reveal"
mv tmp/reveal/dist assets/reveal
mv tmp/reveal/plugin assets/reveal/plugin

echo "Installing Highlight Themes"
mv tmp/highlight/build/styles/*.css assets/reveal/plugin/highlight/

echo "Removing JS Mapping"
sed '/^\/\/#/d' < assets/reveal/reveal.js > assets/reveal/reveal.js.tmp
sed '/^\/\/#/d' < assets/reveal/reveal.esm.js > assets/reveal/reveal.esm.js.tmp
rm -rf assets/reveal/reveal.js && mv assets/reveal/reveal.js.tmp assets/reveal/reveal.js
rm -rf assets/reveal/reveal.esm.js && mv assets/reveal/reveal.esm.js.tmp assets/reveal/reveal.esm.js

echo "Remove temporary folder"
rm -rf tmp