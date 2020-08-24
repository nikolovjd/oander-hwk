FROM node:14.8.0

RUN mkdir /app
WORKDIR /app
RUN npm install

CMD node src/index.js
