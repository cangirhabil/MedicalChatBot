#!/bin/bash

# Medical ChatBot API Startup Script
set -e  # Exit on any error

echo "🏥 Medical ChatBot API Startup"
echo "================================"

# Check if we're in the right directory
if [ ! -f "main.py" ]; then
    echo "❌ Error: main.py not found. Please run this script from the backend directory."
    exit 1
fi

# Set Python path
export PYTHONPATH="${PYTHONPATH}:$(pwd)"

# Check environment
if command -v conda &> /dev/null; then
    echo "📦 Activating conda environment 'medicalchatbot'..."
    source $(conda info --base)/etc/profile.d/conda.sh
    conda activate medicalchatbot
else
    echo "⚠️  Conda not found, using system Python"
fi

# Install dependencies
echo "📋 Installing/updating dependencies..."
pip install -r requirements.txt --quiet

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. Using default configuration."
    echo "   Please create .env file with your API keys for full functionality."
fi

# Start the server
echo "🚀 Starting FastAPI server..."
echo "   Server will be available at: http://localhost:8080"
echo "   API Documentation: http://localhost:8080/docs"
echo "   Alternative docs: http://localhost:8080/redoc"
echo ""

# Use python main.py for better error handling during development
if [ "${NODE_ENV}" = "production" ]; then
    uvicorn main:app --host 0.0.0.0 --port 8080
else
    python main.py
fi
