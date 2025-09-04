# Medical AI ChatBot

Modern ve profesyonel tıbbi AI chatbot uygulaması. Next.js, React, Shadcn/ui ile tasarlanmış frontend ve Flask tabanlı AI backend.

## 🚀 Özellikler

- **Modern UI**: Next.js 15, React 18 ve Shadcn/ui ile tasarlanmış
- **AI Destekli**: Google Gemini AI ile güçlendirilmiş
- **Responsive**: Mobil ve masaüstü uyumlu tasarım
- **Real-time**: Anlık sohbet deneyimi
- **Güvenli**: CORS koruması ve güvenli API iletişimi

## 📋 Gereksinimler

- Node.js 18+ 
- Python 3.10+
- Conda (önerilen)

## 🛠️ Kurulum

### Backend Kurulumu

1. Backend dizinine gidin:
```bash
cd backend
```

2. Conda environment oluşturun ve aktive edin:
```bash
conda create -n medicalchatbot python=3.10
conda activate medicalchatbot
```

3. Gerekli paketleri yükleyin:
```bash
pip install -r requirements.txt
pip install flask-cors
```

4. Environment variables dosyası oluşturun (`.env`):
```bash
PINECONE_API_KEY=your_pinecone_api_key
GEMINI_API_KEY=your_gemini_api_key
```

5. Backend'i başlatın:
```bash
python app.py
```

Backend http://localhost:8081 adresinde çalışacaktır.

### Frontend Kurulumu

1. Frontend dizinine gidin:
```bash
cd frontend
```

2. Dependencies'leri yükleyin:
```bash
npm install
```

3. Development server'ı başlatın:
```bash
npm run dev
```

Frontend http://localhost:3000 adresinde çalışacaktır.

## 🎯 Kullanım

1. Backend ve frontend'i yukarıdaki adımları takip ederek çalıştırın
2. Tarayıcıda http://localhost:3000 adresine gidin
3. Chatbot ile tıbbi sorularınızı sorun!

## 📁 Proje Yapısı

```
MedicalChatBot/
├── backend/                 # Flask API backend
│   ├── src/                # Source kodları
│   ├── data/               # PDF verileri
│   ├── app.py              # Ana Flask uygulaması
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router
│   │   └── components/    # React bileşenleri
│   └── package.json       # Node.js dependencies
└── README.md
```

## 🔧 Teknolojiler

### Frontend
- **Next.js 15**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Shadcn/ui**: UI components
- **Lucide React**: Icons

### Backend
- **Flask**: Web framework
- **LangChain**: AI framework
- **Google Gemini**: AI model
- **Pinecone**: Vector database
- **Flask-CORS**: Cross-origin support

## ⚠️ Önemli Notlar

- Bu AI asistan sadece bilgi amaçlıdır
- Acil durumlar için mutlaka bir sağlık uzmanına başvurun
- API anahtarlarınızı güvende tutun

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
