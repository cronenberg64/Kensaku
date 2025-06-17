#!/bin/bash

# Install dependencies
yarn install

# Build the application
yarn build

# Create production environment file
cat > .env.production << EOL
VITE_API_URL=https://api.your-domain.com
VITE_APP_ENV=production
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
EOL