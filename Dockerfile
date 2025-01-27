FROM node:14-alpine

ARG ENVIRONMENT=development

ENV NODE_ENV ENVIRONMENT
ENV IS_CONTAINER_ENV true

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 80

CMD [ "npm", "run", "startProduction" ]
