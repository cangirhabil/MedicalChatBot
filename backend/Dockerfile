# Multi-stage Dockerfile for Medical ChatBot Backend

# Base stage with common setup
FROM python:3.11-slim AS base

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PYTHONPATH=/app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Development stage
FROM base AS development

# Install development dependencies if needed
RUN pip install --no-cache-dir watchdog

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 8080

# For development, we'll mount the code as volume
# Health check for development
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT:-8080}/healthz || exit 1

# Development command (with reload)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]

# Production stage
FROM base AS production

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Expose port (Render uses PORT environment variable)
EXPOSE 8080

# Health check (use PORT if provided, default to 8080)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT:-8080}/healthz || exit 1

# Start command for production (respect PORT and allow WORKERS override; default workers=1 for free tier)
ENV WORKERS=1
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080} --workers ${WORKERS}"]
