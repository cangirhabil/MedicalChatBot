"""
Helper functions for document processing and embeddings
"""
from typing import List
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter 
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.schema import Document

from core.config import get_settings
from core.logging import get_logger

logger = get_logger(__name__)


def load_pdf_files(data_path: str) -> List[Document]:
    """
    Load PDF files from directory
    
    Args:
        data_path: Path to directory containing PDF files
        
    Returns:
        List of loaded documents
    """
    try:
        logger.info(f"Loading PDF files from {data_path}")
        loader = DirectoryLoader(
            data_path,
            glob="**/*.pdf", 
            loader_cls=PyPDFLoader
        )
        documents = loader.load()
        logger.info(f"Loaded {len(documents)} documents")
        return documents
    except Exception as e:
        logger.error(f"Error loading PDF files: {str(e)}")
        raise


def filter_to_minimal_docs(docs: List[Document]) -> List[Document]:
    """
    Filter documents to minimal required metadata
    
    Args:
        docs: List of documents to filter
        
    Returns:
        List of filtered documents with minimal metadata
    """
    minimal_docs: List[Document] = []
    for doc in docs:
        src = doc.metadata.get("source")
        minimal_docs.append(
            Document(
                page_content=doc.page_content,
                metadata={"source": src}
            )
        )
    return minimal_docs


def text_split(minimal_docs: List[Document]) -> List[Document]:
    """
    Split documents into smaller chunks
    
    Args:
        minimal_docs: List of documents to split
        
    Returns:
        List of split document chunks
    """
    settings = get_settings()
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.chunk_size,
        chunk_overlap=settings.chunk_overlap
    )
    return text_splitter.split_documents(minimal_docs)


def download_embeddings():
    """
    Initialize and return embedding model
    
    Returns:
        HuggingFace embeddings model
    """
    settings = get_settings()
    embeddings = HuggingFaceEmbeddings(
        model_name=settings.embedding_model
    )
    return embeddings