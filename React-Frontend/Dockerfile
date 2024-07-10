# Stage 1: Build the React app
FROM node:22 AS build

# Set working directory
WORKDIR /app


# Install build tools and update npm
RUN apt-get update && apt-get install -y build-essential && npm install -g npm@latest

# Copy package.json 
COPY package.json ./

# Remove node_modules and clean npm cache
RUN rm -rf node_modules && npm cache clean --force

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app with a simple HTTP server
FROM nginx:alpine

# Copy build output to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
