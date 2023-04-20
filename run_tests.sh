#!/bin/bash

# Build the Docker image
docker build -t review-forum .

# Run the Docker container
CONTAINER_ID="$(docker run -d review-forum)"

# Wait for 1 minute
sleep 60

# Run commands inside the container
docker exec -it $CONTAINER_ID sh -c 'npm run test:ci && npm run cypress:run && npx istanbul-merge --out ./coverage/combined/coverage-final.json ./coverage/cypress/coverage-final.json ./coverage/karma/coverage-final.json && npx istanbul report json-summary --dir=./coverage/combined --include=coverage/combined/coverage-final.json && npm run coverage:badge'

# Copy coverage and readme files to local machine
docker cp $CONTAINER_ID:/app/coverage ./coverage
docker cp $CONTAINER_ID:/app/README.md ./README.md

# Stop the container
docker stop $CONTAINER_ID

# Wait for 1 minute
sleep 60

# Delete the container
docker rm -f $CONTAINER_ID