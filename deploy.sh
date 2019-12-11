#/bin/sh

if [ -z "$DOCKER_REGISTRY" ]; then
  DOCKER_REGISTRY="linkedmink.azurecr.io/" 
fi

npm run containerize

sleep 1

docker tag \
  linkedmink/necro-automobilia \
  "${DOCKER_REGISTRY}linkedmink/necro-automobilia"

sleep 1

docker push "${DOCKER_REGISTRY}linkedmink/necro-automobilia"

sleep 1

kubectl set image \
  deployment/necro-automobilia \
  necro-automobilia="${DOCKER_REGISTRY}linkedmink/necro-automobilia:latest" \
  --record

sleep 1

kubectl rollout status deployment/necro-automobilia
