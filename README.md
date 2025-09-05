# Medical AI ChatBot

Modern tıbbi AI chatbot uygulaması. Next.js 15 frontend ve FastAPI backend ile geliştirilmiştir.

## 🚀 Özellikler

- **Modern UI**: Next.js 15, React 19 ve Shadcn/ui ile tasarlandı
- **AI Güçlendirmesi**: Google Gemini AI ile desteklenir
- **Responsive**: Mobil ve masaüstü uyumlu tasarım
- **Gerçek Zamanlı**: Anlık sohbet deneyimi
- **Güvenli**: CORS koruması ve güvenli API iletişimi
- **Type Safety**: Full TypeScript desteği

## 📋 Gereksinimler

- Node.js 18+
- Python 3.10+
- Conda (önerilir)

## 🛠️ Kurulum

### Backend Kurulumu

```bash
cd backend
conda create -n medicalchatbot python=3.10 -y
conda activate medicalchatbot
pip install -r requirements.txt
```

### Environment Variables

`.env` dosyası oluşturun:

```env
PINECONE_API_KEY=your_pinecone_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### Vector Database Kurulumu

```bash
python -m utils.vector_store
```

### Backend Başlatma

```bash
./start.sh
```

Backend http://localhost:8080 adresinde çalışacaktır.

### Frontend Kurulumu

```bash
cd frontend
npm install
npm run dev
```

Frontend http://localhost:3000 adresinde çalışacaktır.

## 🎯 Kullanım

1. Backend ve frontend'i yukarıdaki adımlara göre çalıştırın
2. Tarayıcınızda http://localhost:3000 adresine gidin
3. Chatbot'a tıbbi sorularınızı sorun!

## 📁 Proje Yapısı

```
MedicalChatBot/
├── backend/                 # FastAPI backend
│   ├── api/                # API endpoints
│   │   ├── chat.py        # Ana chat endpoint'leri
│   │   └── legacy.py      # Geriye uyumluluk
│   ├── core/               # Konfigürasyon
│   │   ├── config.py      # Uygulama ayarları
│   │   └── logging.py     # Log konfigürasyonu
│   ├── models/             # Pydantic modeller
│   │   └── chat.py        # Chat modelleri
│   ├── services/           # İş mantığı
│   │   └── chat_service.py # Chat servisi
│   ├── utils/              # Yardımcı araçlar
│   │   └── vector_store.py # Vector database yönetimi
│   ├── src/                # Yardımcı fonksiyonlar
│   │   ├── helper.py      # Döküman işleme
│   │   └── prompt.py      # Prompt şablonları
│   └── data/               # PDF verileri
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router
│   │   ├── components/    # React bileşenleri
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API servisleri
│   │   └── types/         # TypeScript tipleri
│   └── package.json       # Node.js bağımlılıkları
└── README.md
```

## 🔧 Teknolojiler

### Frontend Stack
- **Next.js 15.5.2**: React framework with App Router
- **React 19.1.0**: UI library
- **TypeScript 5**: Type safety and development experience
- **Tailwind CSS 4**: Utility-first CSS framework
- **Shadcn/ui**: Modern UI components built on Radix UI
- **Radix UI**: Accessible, unstyled UI primitives
  - `@radix-ui/react-avatar`: Avatar component
  - `@radix-ui/react-scroll-area`: Custom scrollbar
  - `@radix-ui/react-slot`: Component composition
- **Lucide React 0.542.0**: Beautiful icon library
- **Class Variance Authority**: Component variant utilities
- **clsx**: Conditional CSS classes
- **Tailwind Merge**: Tailwind CSS class merging
- **date-fns**: Modern JavaScript date utility library

### Development Tools (Frontend)
- **ESLint 9**: Code linting
- **TypeScript**: Type definitions for Node.js, React, React DOM
- **PostCSS**: CSS processing
- **Turbopack**: Fast bundler for Next.js

### Backend Stack
- **FastAPI 0.115.0**: Modern, fast web framework for building APIs
- **Uvicorn 0.32.0**: ASGI web server implementation
- **Python 3.10+**: Programming language

### AI & Machine Learning
- **LangChain 0.3.26**: Framework for developing applications powered by LLMs
- **LangChain Google GenAI 2.0.6**: Google Generative AI integration
- **LangChain Pinecone 0.2.8**: Pinecone vector database integration
- **LangChain Community 0.3.26**: Community integrations
- **Sentence Transformers 4.1.0**: Text embeddings
- **Google Gemini AI**: Large language model
- **Pinecone**: Vector database for similarity search

### Data Processing
- **PyPDF 5.6.1**: PDF document processing
- **Python Multipart 0.0.12**: Multipart form data handling

### Configuration & Environment
- **Pydantic 2.10.2**: Data validation and settings management
- **Pydantic Settings 2.6.1**: Settings management
- **python-dotenv 1.1.0**: Environment variable loading

### Development Tools (Backend)
- **Conda**: Environment management
- **Docker**: Containerization
- **Git**: Version control

### Infrastructure
- **Pinecone**: Vector database service
- **Google AI Studio**: AI model hosting
- **Local Development**: Hot reload with auto-restart

### Architecture Patterns
- **RAG (Retrieval-Augmented Generation)**: AI pattern for document-based Q&A
- **Modular Architecture**: Clean separation of concerns
- **RESTful API**: Standard API design
- **Dependency Injection**: Service layer pattern
- **Type Safety**: Full type hints in Python, TypeScript interfaces

## 📡 API Endpoints

### Ana Endpoints
- `GET /` - Health check
- `POST /api/chat/` - Chat endpoint
- `GET /api/chat/health` - Chat service health
- `GET /docs` - Swagger UI
- `GET /redoc` - ReDoc

### Legacy Endpoints
- `POST /get` - Flask uyumlu chat endpoint
- `GET /get` - Flask uyumlu chat endpoint

## ⚠️ Önemli Notlar

- Bu AI asistanı sadece bilgilendirme amaçlıdır
- Acil durumlarda lütfen sağlık profesyoneline danışınız
- API anahtarlarınızı güvenli tutunuz

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
