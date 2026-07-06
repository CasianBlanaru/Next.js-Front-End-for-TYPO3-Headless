FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.12.0 --activate

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable

COPY . .

RUN yarn build

EXPOSE 3000
ENV HOSTNAME=0.0.0.0

CMD ["sh", "-c", "node_modules/.bin/next start -H 0.0.0.0 -p ${PORT:-3000}"]
