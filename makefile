.PHONY: all
all:

.PHONY: dcrun
dcrun: dcstop rmlocalmodules
	docker-compose -f dev.docker-compose.yml up -d
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

.PHONY: rmlocalmodules
rmlocalmodules:
	sudo rm -rf app/node_modules
	sudo rm -rf package/node_modules
