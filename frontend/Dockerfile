# Use Node.js LTS version with a more complete base image
FROM node:18.17.0 as builder

# Set working directory
WORKDIR /app/frontend

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set npm configuration
RUN npm config set registry https://registry.npmjs.org/

# Set environment variables for node-gyp
ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3

# Copy package files
COPY frontend/package*.json ./

# Install dependencies with verbose output and legacy peer deps
RUN npm install --verbose --legacy-peer-deps --no-audit --no-fund --build-from-source

# Copy the rest of the application
COPY frontend/ .

# Set environment variables for build
ENV NODE_ENV=production
ENV VITE_API_URL=http://localhost:8000
ENV NPM_CONFIG_LOGLEVEL=verbose

# Build the application with verbose output
RUN npm run build --verbose || (echo "Build failed. Contents of current directory:" && ls -la && echo "Contents of node_modules:" && ls -la node_modules && exit 1)

# Production stage
FROM node:18.17.0-slim

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built assets from builder
COPY --from=builder /app/frontend/dist ./dist

# Expose the port
ENV PORT=3000
EXPOSE $PORT

# Start the application
CMD serve -s dist -l $PORT 