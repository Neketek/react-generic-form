.PHONY: all
all:

.PHONY: dcrun
dcrun: dcstop
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

.PHONY: sshtest
sshtest:
	docker exec -it react-generic-form-test sh -c "cd /app; sh"

.PHONY: sshpackage
	docker exec -it react-generic-form sh -c "cd /react-generic-form; sh"
