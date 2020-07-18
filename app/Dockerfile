FROM node:lts-alpine

RUN apk add --no-cache python make g++

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]