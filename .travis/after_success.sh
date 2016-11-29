#!/bin/bash

# Add deploy key
chmod 600 .travis/deploy_key.pem
eval `ssh-agent -s`
ssh-add .travis/deploy_key.pem

# Add git remote
git config --global push.default simple
git remote add production dokku@45.55.202.78:apps/production

# Push to dokku-alt server
git push production master:master
