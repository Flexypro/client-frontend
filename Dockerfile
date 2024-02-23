FROM node:18-alpine as builder

WORKDIR /client
COPY package.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /client/dist /usr/share/nginx/html/client

# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf