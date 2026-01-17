"""Chat endpoint with SSE streaming.

This module provides:
- Real-time streaming chat responses from Claude
- Rate limiting for abuse prevention
"""

import json
from collections import defaultdict
from collections.abc import AsyncGenerator
from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from app.core.agent import build_system_prompt, get_chat_client
from app.core.logging import get_logger

router = APIRouter()
logger = get_logger(__name__)

# Simple in-memory rate limiter
request_counts: dict[str, list[datetime]] = defaultdict(list)
RATE_LIMIT = 20  # requests per minute


def check_rate_limit(client_ip: str) -> bool:
    """Check if client has exceeded rate limit."""
    now = datetime.now()
    minute_ago = now - timedelta(minutes=1)

    # Clean old requests
    request_counts[client_ip] = [t for t in request_counts[client_ip] if t > minute_ago]

    # Check limit
    if len(request_counts[client_ip]) >= RATE_LIMIT:
        return False

    request_counts[client_ip].append(now)
    return True


class Message(BaseModel):
    """A single message in the conversation."""

    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    """Request body for chat endpoint."""

    message: str
    conversation_history: list[Message] = []
    profile_context: str = ""


async def generate_stream(
    message: str,
    history: list[Message],
    profile_context: str,
) -> AsyncGenerator[str, None]:
    """Generate SSE stream from Claude API."""
    client = get_chat_client()

    # Build messages list with history
    messages = [{"role": m.role, "content": m.content} for m in history]
    messages.append({"role": "user", "content": message})

    # Build system prompt
    system = build_system_prompt(profile_context)

    logger.info(
        "agent.llm.streaming_started",
        prompt_length=len(message),
        history_length=len(history),
    )

    try:
        async with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system=system,
            messages=messages,
        ) as stream:
            async for text in stream.text_stream:
                yield f"event: token\ndata: {json.dumps({'type': 'token', 'content': text})}\n\n"

        yield f"event: done\ndata: {json.dumps({'type': 'done'})}\n\n"
        logger.info("agent.llm.streaming_completed")

    except Exception as e:
        logger.error("agent.llm.streaming_failed", error=str(e), exc_info=True)
        yield f"event: error\ndata: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"


@router.post("/chat")
async def chat(request: ChatRequest, client_request: Request) -> StreamingResponse:
    """Stream chat response from Claude."""
    client_ip = client_request.client.host if client_request.client else "unknown"

    if not check_rate_limit(client_ip):
        raise HTTPException(status_code=429, detail="Rate limit exceeded")

    return StreamingResponse(
        generate_stream(
            request.message,
            request.conversation_history,
            request.profile_context,
        ),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",  # Disable nginx buffering
        },
    )
