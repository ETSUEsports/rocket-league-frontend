## Build the app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm install
COPY . .
RUN npm run build

## Serve the app
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]