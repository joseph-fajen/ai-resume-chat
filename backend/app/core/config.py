"""Application configuration using pydantic-settings.

This module provides centralized configuration management:
- Environment variable loading from .env file
- Type-safe settings with validation
- Cached settings instance with @lru_cache
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",  # Don't fail on extra env vars
    )

    # Application
    app_name: str = "AI Resume"
    version: str = "1.0.0"
    environment: str = "development"
    log_level: str = "INFO"

    # Anthropic
    anthropic_api_key: str

    # Email service (for contact form - implement later)
    email_service_api_key: str = ""
    notification_email: str = ""

    # CORS
    allowed_origins: list[str] = [
        "http://localhost:8080",
        "http://localhost:5173",
    ]


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance (singleton pattern)."""
    return Settings()  # type: ignore[call-arg]
