FROM node:carbon

ENV NODE_ENV prod
WORKDIR /backend

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run prestart:prod

CMD npm run start:prod
