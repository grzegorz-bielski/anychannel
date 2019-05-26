FROM node:carbon

WORKDIR /backend

RUN apt-get update -q
RUN apt-get install -yq netcat

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

CMD npm run start:prod

USER node
