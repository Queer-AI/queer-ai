#!/usr/bin/env bash

set -e

cd chatbot_website

python3 manage.py makemigrations
python3 manage.py migrate
./manage.py "$@" & npm run watch

cd ../
