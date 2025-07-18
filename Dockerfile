#base image
FROM node:20.0.0-alpine3.18 as base

#set working directory
WORKDIR /app

#copy package.json and package-lock.json
COPY package*.json ./

#install dependencies
RUN npm install

#copy app files
COPY . .

#port
EXPOSE 3000

# run app
CMD [ "npm", "run", "start" ]