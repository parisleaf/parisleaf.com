#!/bin/bash

# Deploy to production server if on branch `master`
if [[ "$TRAVIS_PULL_REQUEST" == "false" && "$TRAVIS_BRANCH" == "master" ]]; then
  # Add deploy key
  chmod 600 .travis/deploy_key.pem
  eval `ssh-agent -s`
  ssh-add .travis/deploy_key.pem

  # Add git remote
  # git remote add dokku-production dokku@parisleaf.com:production

  # Push to production server
  # git push dokku-production master:master
fi
