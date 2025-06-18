"""Usage:

from app.env import Mode, mode

if mode == Mode.PROD:
    print("Running in deployed service")
else:
    print("Running in development workspace")
"""

import os
from enum import Enum
from typing import List


class Mode(str, Enum):
    DEV = "development"
    PROD = "production"


mode = Mode.PROD if os.environ.get("DATABUTTON_SERVICE_TYPE") == "prodx" else Mode.DEV

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://kensaku:kensaku@localhost:5432/kensaku")

# CORS configuration
CORS_ORIGINS: List[str] = [
    "http://localhost:3000",  # Local frontend
    "http://localhost:8000",  # Local backend
    "https://*.up.railway.app",  # Railway domains
]

# Environment
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# API configuration
API_PREFIX = "/api/v1"
API_TITLE = "Kensaku API"
API_DESCRIPTION = "API for Kensaku - Japanese Academic Research Collaboration Platform"
API_VERSION = "0.1.0"

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

__all__ = [
    "Mode",
    "mode",
]
