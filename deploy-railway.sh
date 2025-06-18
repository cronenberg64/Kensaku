#!/bin/bash
# deploy-railway.sh
# Script to deploy Kensaku to Railway

set -e

echo "🚀 Deploying Kensaku to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI is not installed. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway (if not already logged in)
echo "🔐 Logging in to Railway..."
railway login

# Generate secure passwords if not set
if [ -z "$POSTGRES_PASSWORD" ]; then
    export POSTGRES_PASSWORD=$(openssl rand -base64 32)
    echo "🔑 Generated secure PostgreSQL password"
fi

if [ -z "$SECRET_KEY" ]; then
    export SECRET_KEY=$(openssl rand -base64 32)
    echo "🔑 Generated secure FastAPI secret key"
fi

# Create new Railway project (or link existing)
if [ ! -f ".railway" ]; then
    echo "🆕 Creating new Railway project..."
    railway init
else
    echo "🔗 Using existing Railway project..."
fi

# Set environment variables
echo "⚙️  Setting environment variables..."
railway variables set POSTGRES_DB=kensaku
railway variables set POSTGRES_USER=kensaku_user
railway variables set POSTGRES_PASSWORD="$POSTGRES_PASSWORD"
railway variables set SECRET_KEY="$SECRET_KEY"
railway variables set DEBUG=False
railway variables set NODE_ENV=production
railway variables set VITE_APP_NAME=Kensaku

# Deploy the application
echo "📦 Deploying application..."
railway up --detach

# Wait for deployment
echo "⏳ Waiting for deployment to complete..."
sleep 30

# Get the service URLs
echo "🌐 Getting service URLs..."
railway status

echo "✅ Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Get your service URLs from: railway status"
echo "2. Update CORS_ORIGINS and VITE_API_BASE_URL with actual URLs"
echo "3. Run: railway variables set CORS_ORIGINS=https://your-frontend-url.railway.app"
echo "4. Run: railway variables set VITE_API_BASE_URL=https://your-backend-url.railway.app"
echo "5. Redeploy: railway up"
echo ""
echo "🔍 View logs: railway logs"
echo "🌍 Open app: railway open"