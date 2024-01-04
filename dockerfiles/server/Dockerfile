# NOTE:
# Dockerfile does not handle actual bind mount, better use docker run with --volume/-v flag 
#   e.g. docker run -v "path/to/dir":"mount/point" image:version

# FROM ubuntu:20.04

# RUN apt update 

# # enable word backspace 
# RUN "stty werase \^H" >> ~/.bashrc

# ADD install.sh /install.sh
# RUN bash install.sh


# # Binds to port 8080
# EXPOSE  8080

# # container's default starting command 
# # CMD ["node", "/src/index.js"]

# WORKDIR /home

FROM node:alpine

# Set starting working directory
WORKDIR /usr/src/app

# Copy all package*.json files into the container
COPY package*.json .
# Run npm ci for better practice of package installation 
RUN npm ci
COPY . . 

CMD ["npm", "start"]

