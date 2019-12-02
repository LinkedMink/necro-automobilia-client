# Necro Automobilia - Client
## Project Overview

## Getting Started
This client requires a number of components that are meant to run in a microservice architecture.

### Third-Party Prerequisites
The application has been tested with the shown versions.

#### Required
* [Node.js 12](https://nodejs.org/en/download/)
* MongoDB
..* MongoDB 3.6
..* Azure Cosmos DB

#### Recommended
* Docker
* Kubernetes Provider

This package doesn't target any specific platform or provider. Sample files for Kubernetes deployment 
will be included for Azure AKS.

### Internal Prerequisites
* [Node User Service](https://github.com/LinkedMink/node-user-service)
* [Necro Automobilia Service](https://github.com/LinkedMink/necro-automobilia-service)

After setting up the prerequisites, install the npm packages.

```sh
cd ./necro-automobilia
npm install
```

### Config
Copy the public key from [Node User Service](https://github.com/LinkedMink/node-user-service) into 
the root of the project directory. Make sure it has the name *jwtRS256.key.pub* (unless you define
the environmental variable JWT_PUBLIC_KEY_FILE).

The application delivers configuration parameters in different ways depending on if the server runs
locally or on a server. Locally, webpack bundles the parameters with the deployed JavaScript. Copy
webpack.local.config.sample.js to webpack.local.config.js then edit as necessary:

```sh
cd ./necro-automobilia
cp ./webpack.local.config.sample.js ./webpack.local.config.js
```

```javascript
module.exports = {
  userServiceUrl: "https://[Your API Host]",
  perferenceServiceUrl: "https://[Your API Host]",
  necroAutomobiliaUrl: "https://[Your API Host]",
  jwtPublicKey: "[Base64(PEM) If empty, the JWT token will be decoded without verification]",
  googleMapsApiKey: "",
}
```

In a production build, the application uses a minimal server to deliver configuration and the static 
files compiled with webpack (see server.js). This is so that the containers can be configured by 
environmental variables (see deployment).

## Deployment
Docker isn't required to run this service, but in a microservice architecture, use of containers 
has become ubiquitous. Create the Docker image and push it up to a Docker registry.

```sh
cd ./necro-automobilia
npm run containerize
docker push linkedmink/necro-automobilia
```

You can run the images directly for testing or simplicity.

```sh
docker run -d \
  -p 80:8080 \
  -e USER_SERVICE_URL=https://[Your API Host] \
  -e PREFERENCE_SERVICE_URL=... \
  -e NECRO_AUTOMOBILIA_URL=... \
  -e GOOGLE_MAPS_API_KEY=... \
  -e JWT_PUBLIC_KEY=... \
  --name necro-automobilia \
  linkedmink/necro-automobilia
```

The project contains a sample deployment.yaml file for deploying to a Kubernetes cluster. Edit the 
file as necessary. Then apply the changes to your cluster.

```sh
kubectl apply -f ./deployment.yaml
```
