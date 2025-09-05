"""
Configuration settings for the Medical ChatBot API
"""
import os
from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings"""
    
    # API Settings
    app_name: str = "Medical ChatBot API"
    version: str = "1.0.0"
    debug: bool = False
    host: str = "0.0.0.0"
    port: int = 8080
    
    # External API Keys
    pinecone_api_key: Optional[str] = None
    gemini_api_key: Optional[str] = None
    
    # Vector Store Settings
    index_name: str = "medical-chatbot"
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    gemini_model: str = "gemini-2.5-flash"
    
    # RAG Settings
    search_type: str = "similarity"
    search_kwargs_k: int = 3
    chunk_size: int = 500
    chunk_overlap: int = 20
    
    model_config = {
        "env_file": ".env",
        "case_sensitive": False
    }


# Global settings instance
settings = Settings()

def get_settings() -> Settings:
    """Get application settings"""
    return settings