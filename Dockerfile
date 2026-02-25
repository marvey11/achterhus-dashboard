# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
# Copy the built files from Vite's /dist folder
COPY --from=build /app/dist /usr/share/nginx/html
# Optional: Add a custom nginx config if you need SPA routing support
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]