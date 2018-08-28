#!/usr/bin/env bash

set -e

DEEPQA_WORKDIR=$(pwd) docker-compose -f docker/deploy.yml up
