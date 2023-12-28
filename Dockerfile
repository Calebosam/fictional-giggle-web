FROM node:alpine3.19 AS build

WORKDIR /app

COPY package* ./

RUN npm install

COPY . .

RUN npm run build


FROM  nginx:stable-alpine3.17-slim

COPY ./nginx/nginx.conf ./etc/nginx/conf.d/default.conf

COPY --from=build /app/build ./usr/share/nginx/html

EXPOSE 4173

CMD ["nginx", "-g", "daemon off;"]