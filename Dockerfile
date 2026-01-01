# Build frontend
FROM node:22-alpine AS frontend
WORKDIR /app/ui
COPY ui/package*.json ./
RUN npm ci
COPY ui/ ./
RUN npm run build

# Python backend
FROM python:3.11-slim
WORKDIR /app

# Copy built frontend
COPY --from=frontend /app/dist ./dist

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY *.py ./

# Railway uses PORT env variable
ENV PORT=8000
EXPOSE ${PORT}

# Start server (shell form to expand $PORT)
CMD uvicorn main:app --host 0.0.0.0 --port $PORT

