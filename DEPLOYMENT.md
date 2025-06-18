# Railway Deployment Guide

This guide explains how to deploy the Kensaku application on Railway.

## Prerequisites

1. A Railway account
2. Railway CLI installed (`npm i -g @railway/cli`)
3. Git repository with the project code

## Service Setup

### 1. PostgreSQL Service

1. Create a new PostgreSQL service in Railway
2. Note the `DATABASE_URL` environment variable

### 2. Backend Service

1. Create a new service from the backend directory
2. Add the following environment variables:
   ```
   DATABASE_URL=<from PostgreSQL service>
   ENVIRONMENT=production
   PYTHONPATH=/app
   ```
3. Link the PostgreSQL service to the backend service

### 3. Frontend Service

1. Create a new service from the frontend directory
2. Add the following environment variables:
   ```
   VITE_API_URL=<backend service URL>
   NODE_ENV=production
   ```

## Environment Variables

### Backend Service
- `DATABASE_URL`: PostgreSQL connection string
- `ENVIRONMENT`: Set to "production"
- `PYTHONPATH`: Set to "/app"
- `CORS_ORIGINS`: Frontend service URL

### Frontend Service
- `VITE_API_URL`: Backend service URL
- `NODE_ENV`: Set to "production"

## Deployment Steps

1. Push your code to the repository
2. Link your repository to Railway
3. Set up the services as described above
4. Deploy each service:
   ```bash
   # For backend
   cd backend
   railway up

   # For frontend
   cd frontend
   railway up
   ```

## Service URLs

After deployment, Railway will provide URLs for each service:
- Frontend: `https://<project-name>-frontend.up.railway.app`
- Backend: `https://<project-name>-backend.up.railway.app`
- API Documentation: `https://<project-name>-backend.up.railway.app/docs`

## Troubleshooting

1. Check service logs in Railway dashboard
2. Verify environment variables are set correctly
3. Ensure services are properly linked
4. Check CORS configuration if API calls fail
5. Verify database connection if backend fails to start

## Local Development

For local development, use Docker Compose:
```bash
docker-compose up
```

This will start all services locally with the same configuration as production. 