#! /bin/bash

set -xe

rsync -vzrlptD --delete-after $TRAVIS_BUILD_DIR/_site/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
