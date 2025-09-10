#!/bin/bash

# Start script for Render deployment
export PYTHONPATH=/app

# Use PORT environment variable from Render, fallback to 8080
PORT=${PORT:-8080}

echo "Starting Medical ChatBot API on port $PORT"
exec uvicorn main:app --host 0.0.0.0 --port $PORT --workers 2
