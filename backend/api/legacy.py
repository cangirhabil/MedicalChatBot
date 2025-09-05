"""
Legacy API endpoints for backward compatibility
"""
from fastapi import APIRouter, Form, Depends, HTTPException
from fastapi.responses import PlainTextResponse

from services.chat_service import get_chat_service, ChatService
from core.logging import get_logger

logger = get_logger(__name__)
router = APIRouter(tags=["legacy"])


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
    msg: str = Form(...),
    chat_service: ChatService = Depends(get_chat_service)
) -> str:
    """
    Legacy chat endpoint for backward compatibility with Flask app
    
    Args:
        msg: User message from form data
        chat_service: Injected chat service
        
    Returns:
        Plain text response (AI answer only)
    """
    try:
        logger.info(f"Legacy endpoint - received message: {msg[:50]}...")
        
        # Process the message using the chat service
        result = await chat_service.process_message(msg)
        
        # Return only the answer as plain text (Flask compatibility)
        return result["answer"]
        
    except Exception as e:
        logger.error(f"Error in legacy chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )