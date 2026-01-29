# Dockerfile (at project root)

# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Stage 2: Python backend with frontend static files
FROM python:3.12-slim
WORKDIR /app

# Install Python dependencies
COPY backend/pyproject.toml ./
RUN pip install --no-cache-dir \
    "fastapi>=0.115.0" \
    "uvicorn[standard]>=0.32.0" \
    "anthropic>=0.40.0" \
    "pydantic-settings>=2.6.0" \
    "structlog>=25.1.0" \
    "python-multipart>=0.0.12" \
    "pydantic[email]>=2.0.0"

# Copy backend application
COPY backend/app ./app

# Copy built frontend to static directory
COPY --from=frontend-build /app/dist ./static

# Expose port and run
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
