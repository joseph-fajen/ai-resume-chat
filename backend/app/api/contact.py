"""Contact form endpoint.

This module provides:
- Contact form submission handling
- Email delivery (placeholder for now - logs submissions)
"""

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

from app.core.logging import get_logger

router = APIRouter()
logger = get_logger(__name__)


class ContactRequest(BaseModel):
    """Request body for contact form submission."""

    name: str
    email: EmailStr
    company: str = ""
    role: str = ""
    message: str = ""


class ContactResponse(BaseModel):
    """Response for contact form submission."""

    success: bool
    message: str


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(request: ContactRequest) -> ContactResponse:
    """Submit contact form. Currently logs; will email in production."""
    # Log the contact request (replace with email service later)
    logger.info(
        "contact.form_submitted",
        name=request.name,
        email=request.email,
        company=request.company,
        role=request.role,
        message_preview=request.message[:100] if request.message else "",
    )

    # TODO: Implement email delivery with SendGrid/Resend
    # For now, just acknowledge receipt

    return ContactResponse(
        success=True,
        message="Thank you! Joseph will be in touch soon.",
    )
