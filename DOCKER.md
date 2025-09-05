# Medical ChatBot - Docker Deployment Guide

Bu proje Docker kullanarak profesyonel bir şekilde deploy edilmek üzere konfigüre edilmiştir.

## 📋 Gereksinimler

- Docker Engine 20.10+
- Docker Compose 2.0+
- 4GB+ RAM
- 10GB+ disk alanı

## 🚀 Hızlı Başlangıç

### 1. Projeyi Çalıştırma

```bash
# Production modunda başlat
./docker-deploy.sh start

# Development modunda başlat (hot reload ile)
./docker-deploy.sh dev
```

### 2. Servislere Erişim

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Dokümantasyonu**: http://localhost:8080/docs
- **Redis**: localhost:6379

## 🛠️ Yönetim Komutları

```bash
# Servisleri durdur
./docker-deploy.sh stop

# Servisleri yeniden başlat
./docker-deploy.sh restart

# Durum kontrolü
./docker-deploy.sh status

# Logları görüntüle
./docker-deploy.sh logs

# Belirli servisin loglarını görüntüle
./docker-deploy.sh logs backend
./docker-deploy.sh logs frontend

# Sağlık kontrolü
./docker-deploy.sh health

# Temizlik (durdurup Docker kaynaklarını temizle)
./docker-deploy.sh clean
```

## 🏗️ Mimari

### Multi-stage Docker Build'ler

#### Backend (FastAPI)
- **Base Stage**: Python 3.11 + dependencies
- **Development Stage**: Hot reload + development tools
- **Production Stage**: Optimized + security hardening

#### Frontend (Next.js)
- **Dependencies Stage**: Node modules
- **Builder Stage**: Next.js build
- **Production Stage**: Standalone output

### Servisler

1. **Backend API** (Port 8080)
   - FastAPI application
   - Health check endpoints
   - Non-root user security

2. **Frontend** (Port 3000)
   - Next.js application
   - Static file serving
   - SEO optimized

3. **Redis** (Port 6379)
   - Caching layer
   - Session storage
   - Rate limiting support

4. **Nginx** (Port 80/443) - *Opsiyonel*
   - Reverse proxy
   - Load balancing
   - SSL termination
   - Rate limiting

## 🔧 Konfigürasyon

### Environment Variables

#### Backend (.env)
```env
# API Configuration
PINECONE_API_KEY=your_pinecone_key
GOOGLE_API_KEY=your_google_key
PINECONE_INDEX_NAME=medical-chatbot
PINECONE_ENVIRONMENT=us-east1-gcp

# Application
DEBUG=false
LOG_LEVEL=info
HOST=0.0.0.0
PORT=8080
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_API_ENDPOINT=/get
NEXT_PUBLIC_APP_NAME="Medical AI Assistant"
```

### Volume Mounts

- **Backend Data**: `./backend/data:/app/data:ro`
- **Redis Data**: `redis_data:/data`
- **Development Mode**: Source code hot reload

## 🔒 Güvenlik

### Container Security
- Non-root user execution
- Read-only file systems where possible
- Health checks for all services
- Resource limits

### Network Security
- Internal Docker network
- Limited port exposure
- CORS configuration
- Rate limiting (Nginx)

### Image Security
- Multi-stage builds minimize attack surface
- Regular base image updates
- No secrets in images

## 🚀 Production Deployment

### 1. Environment Setup
```bash
# Değişkenleri ayarla
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# API anahtarlarını düzenle
nano backend/.env
```

### 2. SSL/TLS (Nginx ile)
```bash
# SSL sertifikaları ekle
mkdir -p nginx/ssl
# Sertifikalarınızı nginx/ssl/ dizinine kopyalayın

# Nginx'i etkinleştir
docker-compose --profile production up -d
```

### 3. Monitoring
```bash
# Container durumları
docker stats

# Service health
curl http://localhost:8080/
curl http://localhost:3000/

# Logs
docker-compose logs -f --tail=100
```

## 🔧 Troubleshooting

### Common Issues

1. **Port çakışması**
```bash
# Kullanılan portları kontrol et
sudo lsof -i :3000 -i :8080 -i :6379

# Servisleri durdur
./docker-deploy.sh stop
```

2. **Memory yetersizliği**
```bash
# Docker memory kullanımı
docker stats --no-stream

# Kullanılmayan imajları temizle
docker image prune -f
```

3. **Environment variables**
```bash
# Container içindeki env'leri kontrol et
docker exec -it medical-chatbot-api env
docker exec -it medical-chatbot-frontend env
```

4. **Network bağlantısı**
```bash
# Container network'ünü kontrol et
docker network ls
docker network inspect medical-chatbot-network
```

### Debug Mode

```bash
# Development container'ında bash açma
docker exec -it medical-chatbot-api-dev bash
docker exec -it medical-chatbot-frontend-dev sh

# Logs'ları takip etme
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 📊 Performance

### Resource Limits (docker-compose.yml'de eklenebilir)
```yaml
deploy:
  resources:
    limits:
      cpus: '2.0'
      memory: 2G
    reservations:
      cpus: '0.5'
      memory: 512M
```

### Scaling
```bash
# Backend service'ini scale et
docker-compose up -d --scale backend=3
```

Bu Docker setup'ı production-ready olup, monitoring, logging, security ve scalability için optimize edilmiştir.
