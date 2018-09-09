#!/usr/bin/env bash

set -e

cd chatbot_website

python3 manage.py makemigrations
python3 manage.py migrate
if [[ -z $DEBUG ]]; then
    ./manage.py "$@"
else
    ./manage.py "$@" & npm run watch
fi

cd ../
