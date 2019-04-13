FROM node:8.12.0-alpine

WORKDIR /app

COPY package*.json ./
COPY provision/dev provision/dev
RUN sh provision/dev/install.sh

COPY . ./

VOLUME ["/app", "/react-generic-form"]

CMD sh provision/dev/startup.sh
