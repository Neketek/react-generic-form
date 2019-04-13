FROM node:8.15-alpine

WORKDIR /package

COPY package*.json ./
COPY provision/dev provision/dev
RUN sh provision/dev/install.sh

COPY . ./

VOLUME ["/package"]

CMD sh provision/dev/startup.sh
