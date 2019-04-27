.PHONY: all
all:

.PHONY: devrun
devrun: devstop
	docker-compose -f dev.docker-compose.yml up

.PHONY: devstop
devtop:
	docker-compose -f dev.docker-compose.yml down

.PHONY: devbuild
devbuild:
	docker-compose -f dev.docker-compose.yml build

.PHONY: run
run: stop
	docker-compose -f prod.docker-compose.yml up

.PHONY: stop
stop:
	docker-compose -f prod.docker-compose.yml down

.PHONY: build
build:
	docker-compose -f prod.docker-compose.yml build
