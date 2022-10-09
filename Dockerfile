FROM node:alpine

WORKDIR /usr/src/bot

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "./src/main.js"]
