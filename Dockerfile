FROM node:16.15.0 AS build

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d


EXPOSE 3000


CMD ["nginx", "-g",  "daemon off;"]
