FROM ubuntu:16.04
LABEL maintainer="Dash Evolution Developers <evodevs@dash.org>"
LABEL description="Dash Website Builder"

RUN /bin/echo 'gem: --no-document' > /etc/gemrc
RUN apt-get update && apt-get -y upgrade && apt-get -y install curl git ruby ruby-dev build-essential zlib1g-dev make gcc libffi-dev libcurl4-openssl-dev imagemagick graphicsmagick locales && rm -fr /var/cache/apt/*

RUN locale-gen en_US.UTF-8
ENV LANG=en_US.UTF-8

RUN (curl -sL https://deb.nodesource.com/setup_6.x | bash -) && apt-get -y install nodejs && rm -fr /var/cache/apt/*
RUN gem install jekyll bundler
RUN bundle config --global silence_root_warning 1

COPY . /data/
WORKDIR /data

RUN bundle install
RUN npm install

RUN npm run clean
RUN npm run build:js
RUN npm run build:css
RUN npm run build:font
RUN bundler exec jekyll build --config _config.yml | egrep -v '^(Missing i18n key|Using translation)|(default language)'
RUN npm run copy
RUN npm run htmlproof
RUN npm run eslint
RUN bash script/cron-refresh_masternode_count_image.sh && rm -rf script/

