"""
Chat API endpoints
"""
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse

from models.chat import ChatRequest, ChatResponse, ErrorResponse
from services.chat_service import get_chat_service, ChatService
from core.logging import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post(
    "/",
    response_model=ChatResponse,
    responses={
        400: {"model": ErrorResponse, "description": "Bad request"},
        500: {"model": ErrorResponse, "description": "Internal server error"}
    },
    summary="Send a message to the medical chatbot",
    description="Send a message to the AI medical assistant and receive a response based on medical knowledge base"
)
async def chat_endpoint(
    request: ChatRequest,
    chat_service: ChatService = Depends(get_chat_service)
) -> ChatResponse:
    """
    Process a chat message and return AI response
    
    Args:
        request: Chat request containing user message
        chat_service: Injected chat service
        
    Returns:
        ChatResponse with AI answer and context information
    """
    try:
        logger.info(f"Received chat request: {request.message[:50]}...")
        
        # Process the message using the chat service
        result = await chat_service.process_message(request.message)
        
        # Return structured response
        return ChatResponse(
            answer=result["answer"],
            context_used=result.get("context_used", [])
        )
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )


@router.get(
    "/health",
    summary="Check chat service health",
    description="Check if the chat service and all its components are working properly"
)
async def health_check(
    chat_service: ChatService = Depends(get_chat_service)
) -> JSONResponse:
    """
    Check the health of the chat service
    
    Args:
        chat_service: Injected chat service
        
    Returns:
        JSON response with health status
    """
    try:
        is_healthy = chat_service.health_check()
        
        if is_healthy:
            return JSONResponse(
                status_code=200,
                content={"status": "healthy", "message": "Chat service is operational"}
            )
        else:
            return JSONResponse(
                status_code=503,
                content={"status": "unhealthy", "message": "Chat service is not operational"}
            )
            
    except Exception as e:
        logger.error(f"Error in health check: {str(e)}")
        return JSONResponse(
            status_code=503,
            content={"status": "unhealthy", "message": f"Health check failed: {str(e)}"}
        )