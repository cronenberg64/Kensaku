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
    libudev-dev \
    libusb-1.0-0-dev \
    libusb-dev \
    && rm -rf /var/lib/apt/lists/*

# Set npm configuration
RUN npm config set registry https://registry.npmjs.org/

# Set environment variables for node-gyp
ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3
ENV npm_config_build_from_source=true

# Copy package files
COPY frontend/package*.json ./

# Install dependencies with verbose output and legacy peer deps
RUN npm install --verbose --legacy-peer-deps --no-audit --no-fund

# Install additional required dependencies
RUN npm install --save-dev dotenv

# Copy the rest of the application
COPY frontend/ .

# Set environment variables for build
ENV NODE_ENV=production
ENV VITE_API_URL=http://localhost:8000
ENV NPM_CONFIG_LOGLEVEL=verbose
ENV DATABUTTON_PROJECT_ID=kensaku
ENV DATABUTTON_EXTENSIONS='[]'

# Create .env file with required variables
RUN echo "VITE_API_URL=http://localhost:8000" > .env

# Build the application with verbose output and error handling
RUN npm run build --verbose 2>&1 | tee build.log || (echo "Build failed. Build log:" && cat build.log && echo "Contents of current directory:" && ls -la && echo "Contents of node_modules:" && ls -la node_modules && exit 1)

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