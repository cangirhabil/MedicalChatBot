"""
Legacy API endpoints for backward compatibility
"""
from typing import Union
from fastapi import APIRouter, Form, Depends, HTTPException, Request
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel

from services.chat_service import get_chat_service, ChatService
from core.logging import get_logger

logger = get_logger(__name__)
router = APIRouter(tags=["legacy"])


class LegacyRequest(BaseModel):
    """Legacy request model for JSON support"""
    message: str


@router.post(
    "/get",
    response_class=PlainTextResponse,
    summary="Legacy chat endpoint (Flask compatibility)",
    description="Legacy endpoint that maintains compatibility with the original Flask API"
)
@router.get(
    "/get",
    response_class=PlainTextResponse,
    summary="Legacy chat endpoint (Flask compatibility)",
    description="Legacy endpoint that maintains compatibility with the original Flask API"
)
async def legacy_chat(
    request: Request,
    chat_service: ChatService = Depends(get_chat_service),
    msg: str = Form(None)  # Form data (optional)
) -> str:
    """
    Legacy chat endpoint for backward compatibility with Flask app
    Supports both JSON and form data
    
    Args:
        request: FastAPI request object
        chat_service: Injected chat service
        msg: User message from form data (optional)
        
    Returns:
        Plain text response (AI answer only)
    """
    try:
        user_message = None
        
        # Try to get message from JSON body first
        if request.headers.get("content-type") == "application/json":
            try:
                body = await request.json()
                user_message = body.get("message")
            except:
                pass
        
        # Fallback to form data
        if not user_message and msg:
            user_message = msg
            
        if not user_message:
            raise HTTPException(status_code=400, detail="Message is required")
        
        logger.info(f"Legacy endpoint - received message: {user_message[:50]}...")
        
        # Process the message using the chat service
        result = await chat_service.process_message(user_message)
        
        # Return only the answer as plain text (Flask compatibility)
        return result["answer"]
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in legacy chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )