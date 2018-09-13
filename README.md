# Queer AI

The neural network and django chatbot server are forked from [Conchylicultor/DeepQA](https://github.com/Conchylicultor/DeepQA). For more info on this project see their project on Github.

Since our use case is more specific, we have a variety of scripts to accommodate iterative training and automated deployment.

#### Table of Contents

* [Training](#training)
* [Web Server](#webserver)
* [Deployment](#running)

## Training

For training, it is highly recommended to use a GPU with nvidia-docker. If you don't have this set up already, go ahead and [install it](https://github.com/NVIDIA/nvidia-docker).

### Embeddings
In order to use a pre-trained word2vec file, you must first download it and place it in `/data/embeddings`. DeepQA supports both the .bin format of the Google News word2vec embeddings, and the .vec format of the Facebook fasttext embeddings. The vec2bin.py is a small utility script to convert a .vec to a .bin file, which reduces disk space and improve the loading time.

Google News embeddings: https://drive.google.com/file/d/0B7XkCwpI5KDYNlNUTTlSS21pQmM/edit?usp=sharing
