FROM node:18.14.0-alpine3.14 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM node:18.14.0-alpine3.14
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./
ENTRYPOINT [ "node", "index.js" ]
#TODO place config file outside of app folder
