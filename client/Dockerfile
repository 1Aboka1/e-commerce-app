FROM node:18.7.0-alpine
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build