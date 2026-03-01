# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the built files into a SUBFOLDER named 'dashboard'
# This ensures internal paths match the /dashboard/ URL
COPY --from=build /app/dist /usr/share/nginx/html/dashboard

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
