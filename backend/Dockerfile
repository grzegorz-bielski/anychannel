FROM node:carbon

WORKDIR /backend

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run prestart:prod

CMD npm run start:prod

USER node
