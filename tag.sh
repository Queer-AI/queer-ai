#!/usr/bin/env bash

set -e

if [ -f .env ]; then
  source .env
fi

export AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY
export AWS_BUCKET_NAME
export AWS_DEFAULT_REGION

BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
MODEL_DIR="${BASE_DIR}/save/model"
DATA_DIR="${BASE_DIR}/data/samples"
S3_KEY_PREFIX="s3://${AWS_BUCKET_NAME}/DeepQA/tags"


if [ "$1" = "push" ]; then
  tag="$(date -u +'%Y-%m-%dT%H-%MZ')"
  if [ "$#" -gt 1 ]; then
    tag="${tag}_$2"
  fi
  TAG_DIR="${MODEL_DIR}-${tag}"
  echo "Tagging current model as ${tag}."
  echo "Uploading to AWS..."
  aws s3 cp "${MODEL_DIR}/" "${S3_KEY_PREFIX}/${tag}/model" --include "*" 
  aws s3 cp "${DATA_DIR}/" "${S3_KEY_PREFIX}/${tag}/data" --include "*" 
  cp $MODEL_DIR $TAG_DIR
  echo $tag >> modelTag.list
  echo $tag > modelTag.current
  echo "Tagged current model and uploaded to AWS."
elif [ "$1" = "pull" ]; then
  
  if [ "$#" -gt 1 ]; then
    tag=$2
  elif [ -z "$MODEL_TAG" ]; then
    tag=$(cat modelTag.current)
    echo "MODEL_TAG not specified. Using modelTag.current."
  else
    echo "env"
    tag=$MODEL_TAG
  fi
  echo "Loading tagged model ${tag}."
  TAG_DIR="${MODEL_DIR}"
  if [ -d $TAG_DIR ]; then
    echo "${TAG_DIR} already exists! Aborting."
  else
    aws s3 sync "${S3_KEY_PREFIX}/${tag}/model/" $TAG_DIR --include "*"
    aws s3 sync "${S3_KEY_PREFIX}/${tag}/data/" $DATA_DIR --include "*"
    echo $tag > modelTag.current
    echo "Loaded model."
  fi
else
  "Usage: ./tag.sh pull|push [tag]";
fi
  


