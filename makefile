.PHONY: all
all:

.PHONY: dcrun
dcrun: dcstop
	docker-compose -f dev.docker-compose.yml up
	docker container ls

.PHONY: dcrestart
dcrestart: dcstop dcup

.PHONY: dcstop
dcstop:
	docker-compose -f dev.docker-compose.yml down

.PHONY: dcbuild
dcbuild:
	docker-compose -f dev.docker-compose.yml build

.PHONY: sshapp
sshapp:
	docker exec -it react-generic-form-test sh -c "cd /app; sh"

.PHONY: sshpackage
sshpackage:
	docker exec -it react-generic-form-package sh -c "cd /package; sh"

.PHONY: clean
clean: rmpackagelocks rmlocalmodules
	echo "Removing container created volume files"

.PHONY: rmlocalmodules
rmlocalmodules:
	sudo rm -rf app/node_modules
	sudo rm -rf package/node_modules

.PHONY: rmpackagelocks
rmpackagelocks:
	sudo rm -f app/package-lock.json
	sudo rm -f package/package-lock.json
