FROM node:carbon

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .
CMD npm run start