# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /var/www/html/

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install


RUN npm install -g nodemon

# Bundle your source code inside the Docker image
COPY . .

# Expose the port your app runs on
EXPOSE 2000

# Define the command to run your app using npm
CMD ["nodemon", "start"]