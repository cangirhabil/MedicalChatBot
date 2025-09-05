#!/bin/bash

# Medical ChatBot API Startup Script
echo "Starting Medical ChatBot API with FastAPI..."

# Set environment variables if needed
export PYTHONPATH="${PYTHONPATH}:$(pwd)"

# Check if virtual environment exists
if [ -d "venv" ]; then
    echo "Activating virtual environment..."
    source venv/bin/activate
fi

# Install/upgrade dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Start the FastAPI application with uvicorn
echo "Starting FastAPI server..."
uvicorn main:app --host 0.0.0.0 --port 8080 --reload
