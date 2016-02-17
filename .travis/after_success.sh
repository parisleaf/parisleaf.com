#!/bin/bash

# Add deploy key
chmod 600 .travis/deploy_key.pem
eval `ssh-agent -s`
ssh-add .travis/deploy_key.pem

# Add git remote
git config --global push.default simple
git remote add deploy dokku@paisleaf.com:production

# Push to dokku-alt server
git push deploy
