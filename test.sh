#!/usr/bin/env bash
set -e

docker-compose -f docker/test.yml run test "./main.py --test interactive"
