#!/bin/bash

set -e

# punt if PR
if [[ $TRAVIS_PULL_REQUEST != 'false' ]]; then
    echo "IS PULL REQUEST: Skipping deploy rsync"
elif [[ ! -z "$dash_org_pem_pass" ]]; then
    echo -n "DEPLOY - decrypting key..."
    openssl aes-256-cbc -k "$dash_org_pem_pass" -in dash.org-test-web.pem.enc -out dash.org-test-web.pem -d
    chmod 600 dash.org-test-web.pem
    echo "DONE"
    echo "DEPLOY - copying content..."
    export RSYNC_RSH='ssh -i dash.org-test-web.pem'
    rsync -r -c -v --delete-after --exclude-from 'ciexclude.txt' $TRAVIS_BUILD_DIR/_site/ $user@$hostname:$production_path
    echo "DONE"
else
    echo "SKIPPING SITE DEPLOY "
fi
