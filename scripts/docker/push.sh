#!/bin/bash

# CD to root directory
cd ../../

# Export content of .env into env
if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

# Push docker image to docker repo
docker push $DOCKER_REPO/genogram-ui-app