FROM node:22.1.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

CMD [ "npm", "start" ]
