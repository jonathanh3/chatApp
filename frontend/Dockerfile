FROM node:22.1.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

COPY .env-prod .env

RUN npm run build

RUN npm i -g serve

CMD [ "serve", "-s", "build" ]
