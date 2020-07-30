FROM node:lts

ARG NPM_TOKEN

WORKDIR /usr/app

COPY package*.json ./
COPY .npmrc ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]