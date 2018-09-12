rm modelTag.current
rm -f data/samples/*

docker run --runtime=nvidia -v $(pwd)/data:/root/QueerAI/data -v $(pwd)/save:/root/QueerAI/save -t queerai-gpu:latest python3 main.py --saveEvery 500 --numEpochs 500 --learningRate 0.002 --dropout 0.90 --numLayers 2 --hiddenSize 128 --maxLength 50 --initEmbeddings --embeddingSource=GoogleNews-vectors-negative300.bin --corpus lightweight --datasetTag plays

