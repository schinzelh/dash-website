#!/usr/bin/env bash
set -e # halt script on error

npm run build
bundle exec htmlproofer ./_site --disable-external --allow-hash-href --assume-extension --alt-ignore '/.*/' --file-ignore /assets/,/dist/,/style-guide/,/blog/
