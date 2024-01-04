# NOTE:
# Dockerfile does not handle actual bind mount, better use docker run with --volume/-v flag 
#   e.g. docker run -v "path/to/dir":"mount/point" image:version

FROM ubuntu:20.04

RUN apt update 

# enable word backspace 
RUN "stty werase \^H" >> ~/.bashrc

RUN apt install -y vim nano curl build-essential make

# Binds to port 8080
EXPOSE  8080

# container's default starting command 
# CMD ["node", "/src/index.js"]

WORKDIR /home
