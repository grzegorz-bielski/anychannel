FROM node:carbon

WORKDIR /backend

COPY package*.json ./
RUN npm install

COPY . .

CMD npm run start:dev
