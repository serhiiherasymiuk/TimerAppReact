# pull official base image
FROM node:17-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json .
RUN npm install

# copy app files
COPY . .

# expose port
EXPOSE 3000

# start app
CMD ["npm", "start"]