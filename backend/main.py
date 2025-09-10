"""
FastAPI Medical ChatBot Application
"""
import os
from contextlib import asynccontextmanager
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from core.config import get_settings
from core.logging import setup_logging, get_logger
from models.chat import HealthCheck
from api.chat import router as chat_router
from api.legacy import router as legacy_router

# Load environment variables
load_dotenv()

# Setup logging
setup_logging()
logger = get_logger(__name__)

# Get settings
settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan event handler
    """
    # Startup
    logger.info(f"Starting {settings.app_name} v{settings.version}")
    logger.info(f"Debug mode: {settings.debug}")
    
    yield
    
    # Shutdown
    logger.info("Shutting down Medical ChatBot API")


# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    description="AI-powered medical assistant API using FastAPI and LangChain",
    version=settings.version,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Configure CORS
allowed_origins = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
    "https://*.vercel.app",  # Vercel preview URLs
    "https://your-frontend-domain.vercel.app",  # Replace with your actual domain
]

# Add environment-based origins
if not settings.debug:
    # Production origins from environment
    env_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
    allowed_origins.extend([origin.strip() for origin in env_origins if origin.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router)
app.include_router(legacy_router)  # For backward compatibility


@app.get(
    "/",
    response_model=HealthCheck,
    summary="API Health Check",
    description="Check if the API is running and return basic information"
)
async def root() -> HealthCheck:
    """
    Root endpoint for API health check
    
    Returns:
        HealthCheck response with API status and information
    """
    return HealthCheck(
        status="healthy",
        version=settings.version,
        timestamp=datetime.now().isoformat()
    )


@app.get(
    "/healthz",
    response_model=HealthCheck,
    summary="Liveness/Readiness Probe",
    description="Lightweight health endpoint used by platform health checks"
)
async def healthz() -> HealthCheck:
    return HealthCheck(
        status="ok",
        version=settings.version,
        timestamp=datetime.now().isoformat()
    )


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level="info"
    )