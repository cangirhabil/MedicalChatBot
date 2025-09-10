#!/bin/bash

# Start script for Render deployment
echo "Starting Medical ChatBot API..."

# Check if we're in the right directory
echo "Current directory: $(pwd)"
echo "Files in directory:"
ls -la

# Check if main.py exists
if [ ! -f "main.py" ]; then
    echo "Error: main.py not found!"
    exit 1
fi

# Use PORT environment variable from Render, fallback to 8080
PORT=${PORT:-8080}
echo "Starting on port: $PORT"

# Start the application with single worker (more stable for Render)
exec uvicorn main:app --host 0.0.0.0 --port $PORT --workers 1
