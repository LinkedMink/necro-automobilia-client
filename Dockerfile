FROM node:12-alpine

ARG ENVIRONMENT=production

ENV NODE_ENV ENVIRONMENT
ENV IS_CONTAINER_ENV true

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 80

CMD [ "npm", "run", "startProduction" ]
