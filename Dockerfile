FROM ruby:3.1

RUN apt-get update && apt-get install -y git curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

WORKDIR /site

COPY package.json package-lock.json* ./

RUN npm install -g bulma bulma-block-list

COPY Gemfile Gemfile.lock ./

RUN bundle install --system

COPY . .

ENV SASS_PATH /usr/local/lib/node_modules

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--watch"]