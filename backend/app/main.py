"""FastAPI application entry point.

This module creates and configures the FastAPI application with:
- Lifespan event management for startup/shutdown
- Structured logging setup
- Request/response middleware
- CORS support
- Health check endpoints
"""

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api import chat, contact
from app.api.health import router as health_router
from app.core.config import get_settings
from app.core.logging import get_logger, setup_logging
from app.core.middleware import setup_middleware

settings = get_settings()


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
    """Application lifespan event handler.

    Handles startup and shutdown logic:
    - Startup: Configure logging
    - Shutdown: Cleanup resources
    """
    # Startup
    setup_logging(log_level=settings.log_level)
    logger = get_logger(__name__)
    logger.info(
        "application.lifecycle_started",
        app_name=settings.app_name,
        version=settings.version,
        environment=settings.environment,
    )

    yield

    # Shutdown
    logger.info("application.lifecycle_stopped", app_name=settings.app_name)


# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    description="Backend for Joseph Fajen's AI-powered interactive resume",
    version=settings.version,
    lifespan=lifespan,
)

# Setup middleware (includes CORS and request logging)
setup_middleware(app)

# Include routers
app.include_router(health_router, tags=["health"])
app.include_router(chat.router, prefix="/api", tags=["chat"])
app.include_router(contact.router, prefix="/api", tags=["contact"])


@app.get("/")
def read_root() -> dict[str, str]:
    """Root endpoint providing API information."""
    return {
        "message": settings.app_name,
        "version": settings.version,
        "docs": "/docs",
    }


# Mount static files in production (when built frontend exists)
static_dir = Path(__file__).parent.parent / "static"
if static_dir.exists():
    app.mount("/", StaticFiles(directory=str(static_dir), html=True), name="static")


if __name__ == "__main__":
    import uvicorn

    # S104: Binding to 0.0.0.0 is intentional for development/container environments
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",  # noqa: S104
        port=8000,
        reload=True,
    )
