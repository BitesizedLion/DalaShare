FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME /usr/src/app/files

EXPOSE 8080

CMD ["npm", "start"]