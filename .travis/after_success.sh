#!/bin/bash
chmod 600 .travis/deploy_key.pem # this key should have push access

expect << EOF
  spawn ssh-add .travis/deploy_key.pem
  expect "Enter passphrase"
  send "\n";
  expect eof
EOF

git remote add deploy dokku@paisleaf.com:production
git push deploy
