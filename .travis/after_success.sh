#!/bin/sh

# Deploy to staging server if on branch `develop`
if test "$TRAVIS_PULL_REQUEST" == "false" && test "$TRAVIS_BRANCH" == "develop"; then
  # Add deploy key
  chmod 600 .travis/deploy_key.pem
  eval `ssh-agent -s`
  ssh-add .travis/deploy_key.pem

  # Add git remote
  git remote add staging dokku@beta.parisleaf.com:staging

  # Push to dokku-alt server
  git push staging develop:master
fi
