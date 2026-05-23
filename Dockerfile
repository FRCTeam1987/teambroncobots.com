# Multi-stage build for Jekyll site
# Stage 1: Build the site
FROM ruby:3.1 as builder

RUN apt-get update \
    && apt-get install -y --no-install-recommends git curl nodejs npm libsass-dev \
    && rm -rf /var/lib/apt/lists/* \
    ;

WORKDIR /site

COPY package.json package-lock.json* ./

# Install local npm dependencies so node_modules is available under /site
# (the SCSS imports expect ../node_modules relative to /site/_sass/_main.scss)
RUN npm ci --silent

COPY Gemfile Gemfile.lock ./

RUN bundle config set --local path vendor/bundle && bundle install

COPY . .

ENV SASS_PATH /site/node_modules

RUN bundle exec jekyll build

# Stage 2: Runtime image
FROM nginx:mainline-alpine-slim

COPY --from=builder --exclude=**git --exclude=**.lock --exclude=package*.json /site/_site /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]