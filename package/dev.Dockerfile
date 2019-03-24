FROM node:8.15-alpine

WORKDIR /package

COPY package.json /package/package.json
COPY package-lock.json /package/package-lock.json

ENV NODE_ENV "development"
RUN npm --production=false install

COPY . /package/

VOLUME ["/package"]

CMD ["npm", "run", "build"]
