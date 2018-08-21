#!/usr/bin/env bash
set -e

if [ "$1" = "interactive" ]; then
	docker run -i --runtime=nvidia -v $(pwd)/data:/root/DeepQA/data -v $(pwd)/save:/root/DeepQA/save -t deepqa:latest python3 main.py --test interactive
else
	#docker run --runtime=nvidia -v $(pwd)/data:/root/DeepQA/data -v $(pwd)/save:/root/DeepQA/save -t deepqa:latest python3 main.py --test 
	cat save/model/model_predictions.txt
fi
	
	



