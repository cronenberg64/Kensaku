# Add these targets to your existing Makefile
# Railway-specific commands (won't conflict with existing commands)

.PHONY: railway-build railway-deploy railway-logs railway-status railway-shell railway-db

# Build for Railway deployment
railway-build:
	@echo "Building for Railway deployment..."
	docker-compose -f docker-compose.railway.yml build

# Deploy to Railway
railway-deploy:
	@echo "Deploying to Railway..."
	@chmod +x deploy-railway.sh
	@./deploy-railway.sh

# View Railway logs
railway-logs:
	@echo "Viewing Railway logs..."
	railway logs --follow

# Check Railway deployment status
railway-status:
	@echo "Checking Railway status..."
	railway status

# Open Railway shell
railway-shell:
	@echo "Opening Railway shell..."
	railway shell

# Connect to Railway database
railway-db:
	@echo "Connecting to Railway database..."
	railway connect postgres

# Set Railway environment variables
railway-env:
	@echo "Setting Railway environment variables..."
	@echo "Enter PostgreSQL password:"
	@read -s POSTGRES_PASSWORD && \
	railway variables set POSTGRES_PASSWORD="$$POSTGRES_PASSWORD"
	@echo "Enter FastAPI secret key:"
	@read -s SECRET_KEY && \
	railway variables set SECRET_KEY="$$SECRET_KEY"
	railway variables set POSTGRES_DB=kensaku
	railway variables set POSTGRES_USER=kensaku_user
	railway variables set DEBUG=False
	railway variables set NODE_ENV=production
	railway variables set VITE_APP_NAME=Kensaku

# Update Railway URLs after deployment
railway-update-urls:
	@echo "Update these URLs after getting them from 'make railway-status':"
	@echo "Enter your Railway frontend URL (e.g., https://frontend-xxx.railway.app):"
	@read FRONTEND_URL && \
	railway variables set RAILWAY_FRONTEND_URL="$$FRONTEND_URL" && \
	railway variables set CORS_ORIGINS="$$FRONTEND_URL"
	@echo "Enter your Railway backend URL (e.g., https://backend-xxx.railway.app):"
	@read BACKEND_URL && \
	railway variables set RAILWAY_BACKEND_URL="$$BACKEND_URL" && \
	railway variables set VITE_API_BASE_URL="$$BACKEND_URL"
	@echo "Redeploying with updated URLs..."
	railway up

# Clean Railway deployment
railway-clean:
	@echo "Warning: This will delete your Railway project!"
	@echo "Are you sure? (y/N)"
	@read confirm && [ "$$confirm" = "y" ] && railway delete