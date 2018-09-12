#!/usr/bin/env bash

set -e
if [ -f .env ];
  then source .env
fi

export AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY
export AWS_BUCKET_NAME
export AWS_DEFAULT_REGION

if [ -z "$AWS_ACCESS_KEY_ID" ]; then
  echo "Warning; AWS Credentials not present. Failed to load a model."
  exit
fi

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
  aws s3 cp "${MODEL_DIR}/" "${S3_KEY_PREFIX}/${tag}/model" --include "*" --recursive
  aws s3 cp "${DATA_DIR}/" "${S3_KEY_PREFIX}/${tag}/data" --include "*" --recursive
  cp -R $MODEL_DIR $TAG_DIR
  echo $tag >> modelTag.list
  echo $tag > modelTag.current
  echo "Tagged current model and uploaded to AWS."
elif [ "$1" = "pull" ]; then

  if [[ "$#" -gt 1 ]]; then
    tag=$2
  elif [[ -z "$MODEL_TAG" && -f "modelTag.current" ]]; then
    tag=$(cat modelTag.current)
    echo "MODEL_TAG not specified. Using modelTag.current."
  elif [[ -z "$MODEL_TAG" ]]; then
    echo "No MODEL_TAG could be found, and no data was pulled."
    exit 0
  else
    echo "env"
    tag=$MODEL_TAG
  fi
  echo "Loading tagged model ${tag}."
  if [ -d $MODEL_DIR ]; then
    echo "${MODEL_DIR} already exists! Aborting."
  else
    aws s3 sync "${S3_KEY_PREFIX}/${tag}/model/" $MODEL_DIR --include "*"
    aws s3 sync "${S3_KEY_PREFIX}/${tag}/data/" $DATA_DIR --include "*"
    echo $tag > modelTag.current
    echo "Loaded model."
  fi
else
  echo "Usage: ./tag.sh pull|push [tag]";
fi
