FROM node:22-alpine

WORKDIR /app

# Support both repo-root and frontend/ as build context
COPY package*.json ./
RUN npm ci

COPY . .
# Remove backend files if accidentally copied from repo root
RUN rm -rf deployment config packages public vendor var .ddev 2>/dev/null || true

RUN npm run build

EXPOSE 3000
ENV HOSTNAME=0.0.0.0

CMD ["sh", "-c", "exec node_modules/.bin/next start -H 0.0.0.0 -p ${PORT:-3000}"]
