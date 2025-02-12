FROM node:lts-alpine3.20

WORKDIR /app

COPY ./package*.json ./

RUN npm install -g pnpm

RUN pnpm install

CMD ["pnpm", "start-dev"]