"""
Utility functions for setting up and managing the vector database
"""
from typing import List
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from langchain.schema import Document

from core.config import get_settings
from core.logging import get_logger
from src.helper import load_pdf_files, text_split, download_embeddings, filter_to_minimal_docs

load_dotenv()
logger = get_logger(__name__)


class VectorStoreManager:
    """Manager class for vector store operations"""
    
    def __init__(self):
        self.settings = get_settings()
        self.pc = Pinecone(api_key=self.settings.pinecone_api_key)
        self.embedding = download_embeddings()
    
    def setup_index(self) -> None:
        """Create Pinecone index if it doesn't exist"""
        try:
            if not self.pc.has_index(self.settings.index_name):
                logger.info(f"Creating Pinecone index: {self.settings.index_name}")
                self.pc.create_index(
                    name=self.settings.index_name,
                    dimension=384,  # all-MiniLM-L6-v2 embedding dimension
                    metric="cosine",
                    spec=ServerlessSpec(cloud="aws", region="us-east-1")
                )
                logger.info("Index created successfully")
            else:
                logger.info(f"Index {self.settings.index_name} already exists")
        except Exception as e:
            logger.error(f"Error setting up index: {str(e)}")
            raise
    
    def load_documents_to_vector_store(self, data_path: str = "data/") -> None:
        """Load PDF documents into vector store"""
        try:
            logger.info(f"Loading documents from {data_path}")
            
            # Load and process documents
            extracted_data = load_pdf_files(data_path)
            minimal_docs = filter_to_minimal_docs(extracted_data)
            text_chunks = text_split(minimal_docs)
            
            logger.info(f"Processed {len(text_chunks)} text chunks")
            
            # Create vector store
            doc_search = PineconeVectorStore.from_documents(
                documents=text_chunks,
                embedding=self.embedding,
                index_name=self.settings.index_name
            )
            
            logger.info("Documents loaded to vector store successfully")
            return doc_search
            
        except Exception as e:
            logger.error(f"Error loading documents: {str(e)}")
            raise
    
    def get_vector_store(self) -> PineconeVectorStore:
        """Get existing vector store"""
        try:
            return PineconeVectorStore.from_existing_index(
                embedding=self.embedding,
                index_name=self.settings.index_name
            )
        except Exception as e:
            logger.error(f"Error getting vector store: {str(e)}")
            raise


def setup_vector_database(data_path: str = "data/") -> None:
    """Setup complete vector database"""
    manager = VectorStoreManager()
    manager.setup_index()
    manager.load_documents_to_vector_store(data_path)


if __name__ == "__main__":
    setup_vector_database()
