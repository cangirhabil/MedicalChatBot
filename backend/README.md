# Medical ChatBot API - FastAPI Backend

## Technologies

- FastAPI (0.115.0)
- Uvicorn (0.32.0)
- Python 3.10+
- LangChain (0.3.26)
- langchain-google-genai (2.0.6)
- langchain-pinecone (0.2.8)
- sentence-transformers (4.1.0)
- Pinecone (vector database)
- Google Gemini (LLM)
- Pydantic (2.10.2) / pydantic-settings (2.6.1)
- python-dotenv (1.1.0)
- PyPDF (5.6.1)


## Installation & Run

1) Create and activate a Python environment (conda recommended):

```bash
cd backend
conda create -n medicalchatbot python=3.10 -y
conda activate medicalchatbot
```

2) Install Python dependencies:

```bash
pip install -r requirements.txt
```

3) Create a `.env` file in the `backend/` directory with your keys:

```env
PINECONE_API_KEY=your_pinecone_api_key
GEMINI_API_KEY=your_gemini_api_key
```

4) (Optional) Initialize or populate the vector index if needed:

```bash
python -m utils.vector_store
```

5) Start the server (development):

```bash
# using the startup script
chmod +x start.sh
./start.sh

# or directly with uvicorn
uvicorn main:app --host 0.0.0.0 --port 8080 --reload
```

6) Docker (optional):

```bash
# build
docker build -t medical-chatbot-api .
# run
docker run -p 8080:8080 --env-file .env medical-chatbot-api
```

## Quick references

- Swagger UI: http://localhost:8080/docs
- ReDoc: http://localhost:8080/redoc
- Health check: `GET /`