"""
FastAPI Medical ChatBot Application
"""
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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

# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    description="AI-powered medical assistant API using FastAPI and LangChain",
    version=settings.version,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
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


@app.get("/health")
async def health_check():
    """Simple health check endpoint"""
    return JSONResponse(
        status_code=200,
        content={
            "status": "healthy",
            "version": settings.version,
            "timestamp": datetime.now().isoformat()
        }
    )


# Startup event
@app.on_event("startup")
async def startup_event():
    """Application startup event"""
    logger.info(f"Starting {settings.app_name} v{settings.version}")
    logger.info(f"Debug mode: {settings.debug}")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Application shutdown event"""
    logger.info("Shutting down Medical ChatBot API")


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level="info"
    )