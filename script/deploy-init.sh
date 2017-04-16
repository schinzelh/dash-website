#!/bin/bash

set -e

# punt if PR
if [[ $TRAVIS_PULL_REQUEST != 'false' ]]; then
    echo "IS PULL REQUEST: Skipping deploy dependency initialization"
elif [[ ! -z "$dash_org_pem_pass" ]]; then
    echo "INITIALIZING DEPLOY DEPENDENCIES"
    openssl aes-256-cbc -k "$dash_org_pem_pass" -in dash.org-test-web.pem.enc -out dash.org-test-web.pem -d \
        && eval "$(ssh-agent -s)" \
        && chmod 600 $TRAVIS_BUILD_DIR/$IdentityFile \
        && ssh-add $TRAVIS_BUILD_DIR/$IdentityFile
else
    echo "SKIPPING DEPLOY DEPENDENCIES INITIALISATION"
fi
