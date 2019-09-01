FROM node:carbon

ENV NODE_ENV dev
WORKDIR /backend

COPY package*.json ./
RUN npm install

COPY . .

CMD npm run start:dev
