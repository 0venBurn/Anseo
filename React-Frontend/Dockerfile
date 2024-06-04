# Stage 1: Build the React Vite app
FROM node:22 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files, including .env.dev and load-env.sh
COPY . .

# Copy the .env.dev to .env
COPY .env.dev .env

# Build the React app
RUN npm run build

# Stage 2: Serve the app with a simple HTTP server
FROM nginx:alpine

# Copy the build output to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]