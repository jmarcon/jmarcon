FROM ruby:alpine
RUN apk add build-base

WORKDIR /srv/jekyll
EXPOSE 4000

RUN gem install jekyll bundler
COPY Gemfile .
RUN bundle install

CMD ["bundle", "exec", "jekyll", "serve", "--watch", "--drafts", "--host=0.0.0.0", "--incremental"]