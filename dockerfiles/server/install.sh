#!/bin/bash

apt-get update
apt-get install -y vim nano gnupg curl make build-essential  

# MongoDB installation
## NOTE: only for local installation. If using docker, just pull mongo and use seperate container for it 
# sudo apt-get update
# echo "Installing MongoDB ..." 
# curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \
#     sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg \
#    --dearmor
# echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
# sudo apt-get update 
# sudo apt-get install -y mongodb-org


# Node.js installation
# NOTE: it will install tzdata (timezone data) if not previously installed,
#        enter the time zone accordingly 
apt-get install -y node.js npm
