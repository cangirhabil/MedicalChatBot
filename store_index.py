from dotenv import load_dotenv
import os
from pinecone import Pinecone, ServerlessSpec
from src.helper import load_pdf_files, text_split, download_embeddings, filter_to_minimal_docs
from langchain_pinecone.vectorstores import PineconeVectorStore

load_dotenv()


index_name = "medical-chatbot"
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

extracted_data = load_pdf_files("data/")
minimal_docs = filter_to_minimal_docs(extracted_data)
texts_chunk = text_split(minimal_docs)

embedding = download_embeddings()

pc = Pinecone(api_key=PINECONE_API_KEY)




if not pc.has_index(index_name):
    pc.create_index(
        name=index_name, 
        dimension=384, 
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="eu-north-1")
    )

index = pc.Index(index_name)


doc_search = PineconeVectorStore.from_documents(
    documents=texts_chunk,
    embedding=embedding,
    index_name=index_name
)

