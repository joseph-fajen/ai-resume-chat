"""Structured logging configuration for the application.

This module provides centralized logging setup with:
- JSON output for AI-parseable logs
- Request ID correlation using context variables
- Hybrid dotted namespace pattern (domain.component.action_state)
"""

import logging
import uuid
from contextvars import ContextVar

import structlog
from structlog.typing import EventDict, WrappedLogger

# Context variable for request correlation ID
request_id_var: ContextVar[str] = ContextVar("request_id", default="")


def get_request_id() -> str:
    """Get the current request ID from context."""
    return request_id_var.get()


def set_request_id(request_id: str | None = None) -> str:
    """Set request ID in context, generating one if not provided."""
    if not request_id:
        request_id = str(uuid.uuid4())
    request_id_var.set(request_id)
    return request_id


def add_request_id(
    _logger: WrappedLogger, _method_name: str, event_dict: EventDict
) -> EventDict:
    """Processor to add request ID to all log entries."""
    request_id = get_request_id()
    if request_id:
        event_dict["request_id"] = request_id
    return event_dict


def setup_logging(log_level: str = "INFO") -> None:
    """Configure structured logging for the application."""
    level_int = getattr(logging, log_level.upper())

    structlog.configure(
        processors=[
            add_request_id,
            structlog.contextvars.merge_contextvars,
            structlog.processors.add_log_level,
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.StackInfoRenderer(),
            structlog.processors.format_exc_info,
            structlog.processors.JSONRenderer(),
        ],
        wrapper_class=structlog.make_filtering_bound_logger(level_int),
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(),
        cache_logger_on_first_use=True,
    )


def get_logger(name: str) -> WrappedLogger:
    """Get a logger instance for a module."""
    return structlog.get_logger(name)
