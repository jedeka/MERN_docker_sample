# SAMPLE MAKEFILE; running commands

# start docker 
start:
	docker start -i wbdev_webtest

# use double dollar sign to make $PWD readable in terminal
run:
	sudo docker run -it --gpus all -v "$$PWD":"/home/" -w /home --name wbdev_webtest webtest

e:
	docker exec -it wbdev_webtest bash

inspect:
	docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' wbdev_webtest

export_stty:
	echo "stty werase \^H" >> ~/.bashrc
	source ~/.bashrc

install:
	bash install.sh

# ***** Mongo *****
# mongo by default connected to port 27017
mongorun:
	sudo docker run -it --gpus all -p 8888:8888 -v "$$PWD":"/home/" --name mongodb mongo

mongoe:
	docker exec -it mongodb mongosh

mongostart:
	docker start -i mongodb


# ***** Docker *****
up:
	docker-compose up -d

down:
	docker-compose down

cps:
	docker-compose ps

cpsa:
	docker-compose ps -a 

## no need to run docker-compose, directly run docker will do
ces:
	docker exec -it server bash
cem:
	docker exec -it db mongosh

inspect_server:
	docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' server
inspect_mongo:
	docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db