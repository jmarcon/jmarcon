FROM node:alpine

ENV HUGO_VERSION=0.18
RUN apk add --update wget ca-certificates && \
  cd /tmp/ && \
  wget https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz && \
  tar xzf hugo_${HUGO_VERSION}_Linux-64bit.tar.gz && \
  rm -r hugo_${HUGO_VERSION}_Linux-64bit.tar.gz && \
  mv hugo*/hugo* /usr/bin/hugo && \
  apk del wget ca-certificates && \
  rm /var/cache/apk/*

RUN mkdir /src
WORKDIR /src

RUN npm install -g gulp
RUN echo {} > package.json
RUN npm install --save-dev gulp-cli

VOLUME /src
VOLUME /output

EXPOSE 1313

CMD ["hugo","server","-Dt","hugo-geo","--watch=true", "--source=/src","--destination=/output","--bind=0.0.0.0"]
#CMD ["hugo","-t","hugo-geo", "--config=config_github.toml","--destination=/output"]
#CMD ["hugo","-t","hugo-geo", "--config=config_jm.toml","--destination=/output"]
#CMD ["gulp", "watch"]
