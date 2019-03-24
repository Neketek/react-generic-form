FROM node:8.12.0-alpine

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

ENV NODE_ENV "development"
RUN npm --production=false install

COPY . /app/

RUN npm install -g npm-check-updates

EXPOSE 3000

VOLUME ["/app", "/package"]

CMD ["npm", "run", "dev-server-build"]
