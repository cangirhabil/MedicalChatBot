FROM python:3.10-slim-bookworm

WORKDIR /app

# Copy requirements first for better layer caching
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . /app

# Expose port
EXPOSE 8080

# Use uvicorn to run FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]