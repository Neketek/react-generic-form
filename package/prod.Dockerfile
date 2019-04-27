FROM node:8.15-alpine

WORKDIR /package

COPY package*.json ./
COPY provision/prod provision/prod
RUN sh provision/prod/install.sh

COPY . ./

VOLUME ["/package/dist"]

CMD sh provision/prod/startup.sh
