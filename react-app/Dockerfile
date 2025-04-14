# Build stage
FROM node:16-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with legacy peer deps flag to avoid compatibility issues
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Set environment variables with default values for build
ENV REACT_APP_API_URL=http://localhost:5000/api
ENV REACT_APP_TITLE="Fleet Management App"
ENV REACT_APP_VERSION=1.0.0

# Build the application with CI=false to prevent treating warnings as errors
RUN CI=false npm run build

# Production stage
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from builder stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
