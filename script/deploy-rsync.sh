#!/bin/bash

set -e

# punt if PR
if [[ $TRAVIS_PULL_REQUEST != 'false' ]]; then
    echo "IS PULL REQUEST: Skipping deploy rsync"
elif [[ ! -z "$dash_org_pem_pass" ]]; then
    echo "DEPLOYING SITE"
    rsync -r -c -v --delete-after --exclude-from 'ciexclude.txt' $TRAVIS_BUILD_DIR/_site/ $user@$hostname:$production_path
else
    echo "SKIPPING SITE DEPLOY "
fi
