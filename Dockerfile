FROM node:22-alpine

# Cache bust: 2026-07-06
ARG CACHEBUST=1

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.12.0 --activate

COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

COPY . .
RUN yarn build

EXPOSE 3000
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

CMD ["sh", "start.sh"]
