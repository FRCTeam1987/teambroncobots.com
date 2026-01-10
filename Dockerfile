# Multi-stage build for Jekyll site
# Stage 1: Build the site
FROM ruby:3.1 as builder

RUN apt-get update \
    && apt-get install -y --no-install-recommends git curl nodejs npm \
    && rm -rf /var/lib/apt/lists/* \
    ;

WORKDIR /site

COPY package.json package-lock.json* ./

RUN npm install -g bulma bulma-block-list

COPY Gemfile Gemfile.lock ./

RUN bundle install --system

COPY . .

ENV SASS_PATH /usr/local/lib/node_modules

RUN bundle exec jekyll build

# Stage 2: Runtime image
FROM nginx:mainline-alpine-slim

COPY --from=builder --exclude=**git --exclude=**.lock --exclude=package*.json /site/_site /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]