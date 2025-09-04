# Medical AI ChatBot

Modern and professional medical AI chatbot application. Frontend designed with Next.js, React, Shadcn/ui and Flask-based AI backend.

## 🚀 Features

- **Modern UI**: Designed with Next.js 15, React 18 and Shadcn/ui
- **AI Powered**: Powered by Google Gemini AI
- **Responsive**: Mobile and desktop compatible design
- **Real-time**: Instant chat experience
- **Secure**: CORS protection and secure API communication

## 📋 Requirements

- Node.js 18+ 
- Python 3.10+
- Conda (recommended)

## 🛠️ Installation

### Backend Installation

2. Create and activate conda environment:
3. Install required packages:
```bash
pip install -r requirements.txt
4. Create environment variables file (`.env`):
```bash
PINECONE_API_KEY=your_pinecone_api_key
GEMINI_API_KEY=your_gemini_api_key
```

5. Start the backend:
```bash
python app.py
```
This project is distributed under the MIT License.
Backend will run on http://localhost:8080.

For questions or contributions, please open an issue in the repository.

This project provides medical information for educational purposes and does not replace professional medical advice.
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on http://localhost:3000.

## 🎯 Usage

1. Run backend and frontend following the steps above
2. Go to http://localhost:3000 in your browser
3. Ask your medical questions to the chatbot!

## 📁 Project Structure

```
MedicalChatBot/
├── backend/                 # Flask API backend
│   ├── src/                # Source codes
│   ├── data/               # PDF data
│   ├── app.py              # Main Flask application
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router
│   │   └── components/    # React components
│   └── package.json       # Node.js dependencies
└── README.md
```

## 🔧 Technologies

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

## ⚠️ Important Notes

- This AI assistant is for informational purposes only
- For emergencies, please consult a healthcare professional
- Keep your API keys secure

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
