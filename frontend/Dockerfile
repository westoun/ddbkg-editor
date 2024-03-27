FROM node:18.18.0 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.17.10 as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist/ddbkg-editor /app
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
