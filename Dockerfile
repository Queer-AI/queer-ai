## Dockerfile to build QueerAI container image
## This image is for running the webserver, for training see Dockerfile.gpu
FROM python:3.5.2

## Dependencies

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

RUN \
  apt-get -qq -y update && apt-get -y install unzip nodejs

RUN  \
  pip3 install -U nltk \
  awscli \
  tqdm \
  django==1.10.1 \
  asgi_redis \
  django-webpack-loader \
  channels==1.1.6 && \
  python3 -m nltk.downloader punkt

## Tensorflow
ARG TF_BINARY_URL=https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-1.0.0-cp35-cp35m-linux_x86_64.whl

RUN \
  pip3 install -U $TF_BINARY_URL

COPY ./ /root/QueerAI

WORKDIR /root/QueerAI

RUN npm install

## Run Config

# You should generate your own key if you want deploy it on a server
ENV CHATBOT_SECRET_KEY="e#0y6^6mg37y9^+t^p_$xwnogcdh=27)f6_=v^$bh9p0ihd-%v"
ENV CHATBOT_REDIS_URL="redis"
EXPOSE 8000

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_BUCKET_NAME
ARG GCP_API_KEY

RUN ./tag.sh pull

RUN npm run build

# Launch the server
CMD ./manage.sh runserver 0.0.0.0:8000
