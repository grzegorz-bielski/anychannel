FROM node:carbon

WORKDIR /backend

RUN apt-get update -q
RUN apt-get install -yq netcat

COPY package*.json ./
RUN npm install

COPY . .

CMD npm run start:dev
