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

### Frontend
- **Next.js 15**: React framework
- **React 19**: UI library
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Styling
- **Shadcn/ui**: UI bileşenleri
- **Radix UI**: Erişilebilir bileşenler
- **Lucide React**: İkonlar

### Backend
- **FastAPI**: Modern web framework
- **LangChain**: AI framework
- **Google Gemini**: AI model
- **Pinecone**: Vector database
- **Pydantic**: Data validation
- **Uvicorn**: ASGI server

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
