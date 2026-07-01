FROM node:22-alpine

WORKDIR /app

COPY package.json ./
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 3000
ENV HOSTNAME=0.0.0.0

CMD ["yarn", "start"]
