#docker run --rm --name "my-hugo" -p 1313:1313 -v $(pwd):/src hugo 
docker run --rm --name "my-hugo" -p 1313:1313 -v $(pwd):/src -v /Users/jmarcon/Projects/Blog/hugo:/output hugo:jm 
yes | cp -Rf /Users/jmarcon/Projects/Blog/hugo/ /Users/jmarcon/Projects/Blog/julianomarcon