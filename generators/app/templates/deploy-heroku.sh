#!/bin/bash

sudo rm -rf .git

git init

heroku login
heroku container:login

heroku create || echo "App already exists on your heroku"

git add .
git commit -am "first deploy"
git push heroku master

heroku logs --tail
