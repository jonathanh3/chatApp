# Use an official Node.js runtime as a parent image
FROM node:22.1.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the application code to the working directory
COPY frontend /usr/src/app/frontend
COPY server /usr/src/app/server

# Install dependencies
RUN npm install

# Define the command to run the app
CMD [ "npm", "start" ]
