#!/usr/bin/env bash
set -e

if [ "$1" = "interactive" ]; then
	docker run -i -t deepqa:latest python3 main.py --test interactive 
else
	docker run -t deepqa:latest python3 main.py "$tag" --test && \
	cat save/model/model_predictions.txt
fi
	
	



