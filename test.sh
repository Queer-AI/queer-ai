#!/usr/bin/env bash
set -e

docker-compose -f docker/test run test
