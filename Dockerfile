FROM ruby:3.1

RUN apt-get update && apt-get install -y --no-install-recommends git curl nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /site

COPY package.json package-lock.json* ./

RUN npm install -g bulma bulma-block-list

COPY Gemfile Gemfile.lock ./

RUN bundle install --system

COPY . .

ENV SASS_PATH /usr/local/lib/node_modules

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--watch"]