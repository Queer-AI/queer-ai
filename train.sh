docker run --runtime=nvidia -v $(pwd)/data:/root/DeepQA/data -v $(pwd)/save:/root/DeepQA/save -t deepqa-gpu:latest python3 main.py --saveEvery 500 --numEpochs 300 --learningRate 0.0002 --dropout 0.80 --numLayers 3 --hiddenSize 512 --maxLength 50 --initEmbeddings --embeddingSource=GoogleNews-vectors-negative300.bin --corpus lightweight --datasetTag plays

