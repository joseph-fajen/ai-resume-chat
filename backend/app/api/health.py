"""Health check endpoints.

This module provides:
- Basic health check for load balancer probes
- Readiness check for application dependencies
"""

from fastapi import APIRouter

from app.core.config import get_settings

router = APIRouter()


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Basic health check endpoint."""
    settings = get_settings()
    return {
        "status": "healthy",
        "service": "ai-resume-api",
        "version": settings.version,
    }


@router.get("/health/ready")
async def readiness_check() -> dict[str, str]:
    """Readiness check for all application dependencies."""
    settings = get_settings()
    return {
        "status": "ready",
        "environment": settings.environment,
    }
