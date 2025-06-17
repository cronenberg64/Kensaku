#!/bin/bash

# Install dependencies
uv pip install -r requirements.txt

# Create production environment file
cat > .env.production << EOL
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=production
CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id
JWT_SECRET=your-jwt-secret
JWT_ALGORITHM=HS256
JWT_EXPIRATION=3600
DATABASE_URL=your-database-url
LOG_LEVEL=INFO
EOL