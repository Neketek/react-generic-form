FROM node:8.12.0-alpine

WORKDIR /app

COPY package.json /app/package.json
# COPY package-lock.json /app/package-lock.json

ENV NODE_ENV "development"
# RUN npm --production=false install
# RUN mv node_modules /node_modules

COPY . /app/

RUN npm install -g npm-check-updates

VOLUME ["/app", "/react-generic-form"]

# CMD npm run dev-server-build
CMD npm --production=false install \
  && cd /react-generic-form \
  && npm link \
  && cd /app \
  && npm link react-generic-form \
  && npm run dev-server-build
