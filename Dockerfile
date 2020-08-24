FROM node:14.8.0

RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install

CMD node /app/src/index.js
