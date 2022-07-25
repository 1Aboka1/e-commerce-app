FROM node:15.13-alpine
WORKDIR /react
COPY package.json package-lock.json 
RUN npm install 
RUN npm install react-scripts@3.4.1 -g 
COPY . .
RUN npm run build
EXPOSE 3000