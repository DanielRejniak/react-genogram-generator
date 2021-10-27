#!/bin/bash

# CD to root directory
cd ../../

# Export content of .env into env
if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi


# Build docker image
docker build -t $DOCKER_REPO/genogram-ui-app .