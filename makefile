.PHONY: all
all:


.PHONY: dbuild
dbuild:
	docker build -f dev.Dockerfile -t react-generic-form:dev .

.PHONY: drun
drun:
	docker run -it -v ${PWD}:/react-generic-form react-generic-form:dev sh


.PHONY: dstop
dstop:
	echo "STOP"
