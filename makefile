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
