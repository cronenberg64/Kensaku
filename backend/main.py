import os
import pathlib
import json
import dotenv
from fastapi import FastAPI, APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
import logging

# Load environment variables
env_file = ".env.production" if os.getenv("ENVIRONMENT") == "production" else ".env"
dotenv.load_dotenv(env_file)

# Configure logging
logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

from databutton_app.mw.auth_mw import AuthConfig, get_authorized_user


def get_router_config() -> dict:
    try:
        # Note: This file is not available to the agent
        cfg = json.loads(open("routers.json").read())
    except:
        return False
    return cfg


def is_auth_disabled(router_config: dict, name: str) -> bool:
    return router_config["routers"][name]["disableAuth"]


def import_api_routers() -> APIRouter:
    """Create top level router including all user defined endpoints."""
    routes = APIRouter(prefix="/routes")

    router_config = get_router_config()

    src_path = pathlib.Path(__file__).parent

    # Import API routers from "src/app/apis/*/__init__.py"
    apis_path = src_path / "app" / "apis"

    api_names = [
        p.relative_to(apis_path).parent.as_posix()
        for p in apis_path.glob("*/__init__.py")
    ]

    api_module_prefix = "app.apis."

    for name in api_names:
        print(f"Importing API: {name}")
        try:
            api_module = __import__(api_module_prefix + name, fromlist=[name])
            api_router = getattr(api_module, "router", None)
            if isinstance(api_router, APIRouter):
                routes.include_router(
                    api_router,
                    dependencies=(
                        []
                        if is_auth_disabled(router_config, name)
                        else [Depends(get_authorized_user)]
                    ),
                )
        except Exception as e:
            print(e)
            continue

    print(routes.routes)

    return routes


def get_firebase_config() -> dict | None:
    extensions = os.environ.get("DATABUTTON_EXTENSIONS", "[]")
    extensions = json.loads(extensions)

    for ext in extensions:
        if ext["name"] == "firebase-auth":
            return ext["config"]["firebaseConfig"]

    return None


def create_app() -> FastAPI:
    """Create the app. This is called by uvicorn with the factory option to construct the app object."""
    app = FastAPI(
        title="Kensaku API",
        description="Academic paper management and search API",
        version="1.0.0",
        docs_url="/api/docs" if os.getenv("ENVIRONMENT") != "production" else None,
        redoc_url="/api/redoc" if os.getenv("ENVIRONMENT") != "production" else None,
    )

    # Configure CORS
    cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Add error handlers
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request, exc):
        logger.error(f"Validation error: {exc}")
        return JSONResponse(
            status_code=422,
            content={"detail": str(exc)},
        )

    @app.exception_handler(Exception)
    async def general_exception_handler(request, exc):
        logger.error(f"Unexpected error: {exc}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error"},
        )

    # Include routers
    app.include_router(import_api_routers())

    # Log all routes
    for route in app.routes:
        if hasattr(route, "methods"):
            for method in route.methods:
                logger.info(f"{method} {route.path}")

    # Configure Firebase auth
    firebase_config = get_firebase_config()
    if firebase_config is None:
        logger.warning("No firebase config found")
        app.state.auth_config = None
    else:
        logger.info("Firebase config found")
        auth_config = {
            "jwks_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
            "audience": firebase_config["projectId"],
            "header": "authorization",
        }
        app.state.auth_config = AuthConfig(**auth_config)

    return app


app = create_app()
