"""
Chat service containing business logic for the medical chatbot
"""
from typing import Dict, Any, Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

from core.config import get_settings
from core.logging import get_logger
from utils.vector_store import VectorStoreManager
from src.prompt import system_prompt

logger = get_logger(__name__)


class ChatService:
    """Service class for handling chat operations"""
    
    def __init__(self):
        """Initialize the chat service"""
        self.settings = get_settings()
        self._initialize_components()
    
    def _initialize_components(self) -> None:
        """Initialize LangChain components"""
        try:
            logger.info("Initializing chat service components...")
            
            # Initialize vector store manager
            self.vector_manager = VectorStoreManager()
            
            # Get vector store
            self.doc_search = self.vector_manager.get_vector_store()
            
            # Initialize retriever
            self.retriever = self.doc_search.as_retriever(
                search_type=self.settings.search_type,
                search_kwargs={"k": self.settings.search_kwargs_k}
            )
            
            # Initialize chat model
            self.chat_model = ChatGoogleGenerativeAI(
                model=self.settings.gemini_model,
                google_api_key=self.settings.gemini_api_key
            )
            
            # Initialize prompt template
            self.prompt = ChatPromptTemplate.from_messages([
                ("system", system_prompt),
                ("human", "{input}")
            ])
            
            # Initialize chains
            self.question_answering_chain = create_stuff_documents_chain(
                self.chat_model, self.prompt
            )
            self.rag_chain = create_retrieval_chain(
                self.retriever, self.question_answering_chain
            )
            
            logger.info("Chat service components initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize chat service: {str(e)}")
            raise
    
    async def process_message(self, message: str) -> Dict[str, Any]:
        """
        Process a user message and return AI response
        
        Args:
            message: User message
            
        Returns:
            Dictionary containing AI response and metadata
        """
        try:
            logger.info(f"Processing message: {message[:50]}...")
            
            # Invoke the RAG chain
            response = self.rag_chain.invoke({"input": message})
            
            # Extract context sources
            context_sources = []
            if "context" in response:
                for doc in response["context"]:
                    if hasattr(doc, 'metadata') and 'source' in doc.metadata:
                        context_sources.append(doc.metadata['source'])
            
            result = {
                "answer": response["answer"],
                "context_used": context_sources
            }
            
            logger.info("Message processed successfully")
            return result
            
        except Exception as e:
            logger.error(f"Error processing message: {str(e)}")
            raise
    
    def health_check(self) -> bool:
        """
        Perform a health check on the service
        
        Returns:
            True if service is healthy, False otherwise
        """
        try:
            # Test a simple query to ensure all components are working
            test_response = self.rag_chain.invoke({"input": "test"})
            return bool(test_response.get("answer"))
        except Exception as e:
            logger.error(f"Health check failed: {str(e)}")
            return False


# Global service instance
_chat_service: Optional[ChatService] = None


def get_chat_service() -> ChatService:
    """
    Get or create the chat service instance
    
    Returns:
        ChatService instance
    """
    global _chat_service
    if _chat_service is None:
        _chat_service = ChatService()
    return _chat_service