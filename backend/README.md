# Medical ChatBot API - FastAPI Backend

A modern, modular FastAPI-based backend for the Medical ChatBot application using RAG (Retrieval-Augmented Generation) with LangChain, Pinecone, and Google Gemini.

## Features

- ✅ **FastAPI**: Modern, fast web framework with automatic API documentation
- ✅ **Modular Architecture**: Clean separation of concerns with services, models, and API layers
- ✅ **RAG Implementation**: Retrieval-Augmented Generation using LangChain
- ✅ **Vector Database**: Pinecone for efficient similarity search
- ✅ **AI Model**: Google Gemini for intelligent responses
- ✅ **Type Safety**: Full type hints with Pydantic models
- ✅ **Logging**: Comprehensive logging system
- ✅ **CORS Support**: Cross-origin resource sharing enabled
- ✅ **Legacy Compatibility**: Backward compatibility with Flask endpoints
- ✅ **Docker Support**: Containerized deployment
- ✅ **Auto Documentation**: Interactive API docs at `/docs`

## Project Structure

```
backend/
├── api/                    # API endpoints and routers
│   ├── chat.py            # Main chat endpoints
│   └── legacy.py          # Legacy Flask-compatible endpoints
├── core/                   # Core configuration and utilities
│   ├── config.py          # Application settings
│   └── logging.py         # Logging configuration
├── models/                 # Pydantic models
│   └── chat.py            # Request/response models
├── services/               # Business logic
│   └── chat_service.py    # Chat processing service
├── src/                    # Original utilities (helper functions)
│   ├── helper.py          # Document processing utilities
│   └── prompt.py          # Prompt templates
├── data/                   # Data files
│   └── Medical_book.pdf   # Knowledge base
├── main.py                 # FastAPI application entry point
├── requirements.txt        # Python dependencies
├── Dockerfile             # Docker configuration
└── start.sh              # Startup script
```

## Setup and Installation

### 1. Environment Setup

```bash
# Create conda environment
conda create -n medicalchatbot python=3.10 -y
conda activate medicalchatbot

# Or use venv
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env` file in the backend directory:

```env
PINECONE_API_KEY=your_pinecone_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the Application

#### Option 1: Using the startup script
```bash
chmod +x start.sh
./start.sh
```

#### Option 2: Direct uvicorn command
```bash
uvicorn main:app --host 0.0.0.0 --port 8080 --reload
```

#### Option 3: Using Python
```bash
python main.py
```

### 5. Docker Deployment

```bash
# Build the image
docker build -t medical-chatbot-api .

# Run the container
docker run -p 8080:8080 --env-file .env medical-chatbot-api
```

## API Documentation

Once the application is running, access:

- **Interactive Docs (Swagger)**: http://localhost:8080/docs
- **ReDoc Documentation**: http://localhost:8080/redoc
- **OpenAPI JSON**: http://localhost:8080/openapi.json

## API Endpoints

### Main Chat API

```http
POST /api/chat/
Content-Type: application/json

{
  "message": "What are the symptoms of diabetes?"
}
```

Response:
```json
{
  "answer": "Diabetes symptoms include frequent urination, increased thirst, and unexplained weight loss.",
  "context_used": ["Medical textbook chapter on diabetes"]
}
```

### Legacy Compatibility

```http
POST /get
Content-Type: application/x-www-form-urlencoded

msg=What are the symptoms of diabetes?
```

### Health Checks

```http
GET /health
GET /api/chat/health
```

## Architecture Components

### 1. Configuration Management
- Centralized settings using Pydantic
- Environment variable support
- Type-safe configuration

### 2. Service Layer
- `ChatService`: Handles all chat processing logic
- Singleton pattern for efficient resource usage
- Dependency injection with FastAPI

### 3. API Layer
- RESTful endpoints with proper HTTP status codes
- Request/response validation with Pydantic
- Comprehensive error handling

### 4. Models
- Type-safe request/response models
- JSON schema generation
- Input validation

## Migration from Flask

The application has been fully migrated from Flask to FastAPI while maintaining:

1. **Backward Compatibility**: Legacy `/get` endpoint still works
2. **Same Functionality**: All original features preserved
3. **Enhanced Performance**: FastAPI's async capabilities
4. **Better Documentation**: Automatic API documentation
5. **Type Safety**: Full type hints and validation

## Development

### Adding New Endpoints

1. Create router in `api/` directory
2. Add business logic to `services/`
3. Define models in `models/`
4. Include router in `main.py`

### Running Tests

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

## Production Deployment

For production deployment:

1. Set `debug=False` in configuration
2. Configure proper CORS origins
3. Use environment variables for all secrets
4. Set up proper logging levels
5. Use a production ASGI server like Gunicorn with Uvicorn workers

```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8080
```

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure all dependencies are installed
2. **API Key Issues**: Check `.env` file configuration
3. **Port Conflicts**: Change port in configuration if needed
4. **CORS Issues**: Verify CORS configuration for your frontend

### Logs

Check application logs for detailed error information. Logs include:
- Request/response details
- Error stack traces
- Performance metrics
- Service health status

## Contributing

1. Follow the existing code structure
2. Add type hints to all functions
3. Include docstrings for public methods
4. Test your changes thoroughly
5. Update documentation as needed