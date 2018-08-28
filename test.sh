#!/usr/bin/env bash
set -e

tag=$(cat modelTag.current)

if [ "$1" = "interactive" ]; then
	docker run -i -t deepqa:latest python3 main.py --modelTag "$tag" --test interactive 
else
	docker run -t deepqa:latest python3 main.py --modelTag "$tag" --test && \
	cat save/model/model_predictions.txt
fi
	
	



