FROM node:18.2.0-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

CMD ["npm", "run", "dev"]

