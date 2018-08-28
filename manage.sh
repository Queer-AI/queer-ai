#!/usr/bin/env bash

set -e

cd chatbot_website

if [ $1 = "initialize" ]; then
	python3 manage.py makemigrations
	python3 manage.py migrate
else
	./manage.py "$@"
fi

cd ../

