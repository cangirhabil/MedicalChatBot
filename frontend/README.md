# Medical ChatBot - Modular Frontend Structure

Bu proje, Tailwind CSS kullanarak temiz ve modüler bir yapıda yeniden düzenlenmiştir.

## 📁 Proje Yapısı

### Frontend Klasör Organizasyonu

```
frontend/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── globals.css      # Global styles ve Tailwind konfigürasyonu
│   │   ├── layout.tsx       # Ana layout
│   │   └── page.tsx         # Ana sayfa
│   ├── components/          # Tüm React componentleri
│   │   ├── ui/              # Shadcn/ui base componentleri
│   │   ├── common/          # Ortak kullanılan componentler
│   │   │   ├── Layout.tsx   # Ana layout wrapper
│   │   │   └── index.ts     # Export barrel
│   │   ├── chat/            # Chat ile ilgili tüm componentler
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── ChatCardHeader.tsx
│   │   │   ├── MessageItem.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── TypingIndicator.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatFooter.tsx
│   │   │   └── index.ts     # Export barrel
│   │   └── ChatBot.tsx      # Ana chat component
│   ├── hooks/               # Custom React hooks
│   │   ├── useChat.ts       # Chat state yönetimi
│   │   ├── useAutoScroll.ts # Otomatik scroll işlevi
│   │   └── index.ts         # Export barrel
│   ├── services/            # API ve external servisler
│   │   └── chatService.ts   # Chat API servisi
│   ├── types/               # TypeScript type definitions
│   │   └── chat.ts          # Chat ile ilgili tipler
│   ├── constants/           # Sabitler ve konfigürasyon
│   │   └── config.ts        # Uygulama konfigürasyonu
│   └── lib/                 # Utility fonksiyonları
│       └── utils.ts         # Genel utility fonksiyonları
└── .env.local               # Environment variables
```

## 🏗️ Modüler Yapının Avantajları

### 1. **Temiz Kod Organizasyonu**
- Her component kendi dosyasında
- İlgili componentler aynı klasörde gruplanmış
- Barrel exports ile temiz import statements

### 2. **Yeniden Kullanılabilirlik**
- Componentler birbirinden bağımsız
- Hook'lar farklı componentlerde kullanılabilir
- Servisler centralized

### 3. **Tip Güvenliği**
- TypeScript ile tam tip desteği
- Interface'ler ayrı dosyalarda
- Compile-time hata yakalama

### 4. **Maintainability**
- Kolay debug etme
- Kolay test yazma
- Kolay refactoring

## 🎨 Tailwind CSS Kullanımı

### Design System
- **Color Palette**: Modern oklch color space kullanımı
- **Dark Mode**: Otomatik tema değişimi
- **Typography**: Geist font family
- **Spacing**: Consistent spacing scale

### Component Styling
```tsx
// Örnek: MessageItem component
<div className={`
  ${UI_CONFIG.MAX_MESSAGE_WIDTH} 
  rounded-2xl px-4 py-3 
  ${message.isBot
    ? 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white'
    : 'bg-blue-600 text-white ml-auto'
  }
`}>
```

### Responsive Design
- Mobile-first approach
- Responsive padding: `p-4 md:p-6 lg:p-8`
- Flexible layouts
- Touch-friendly interface

## 🔧 Konfigürasyon

### Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8081
NEXT_PUBLIC_API_ENDPOINT=/get
NEXT_PUBLIC_APP_NAME="Medical AI Assistant"
NEXT_PUBLIC_APP_DESCRIPTION="Profesyonel tıbbi AI asistanınız"
```

### Constants
```typescript
export const CHAT_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081',
  CHAT_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT || '/get',
  MAX_MESSAGE_LENGTH: 1000,
} as const;
```

## 🎯 Custom Hooks

### useChat Hook
- Message state yönetimi
- API çağrıları
- Error handling
- Loading states

### useAutoScroll Hook
- Otomatik scroll to bottom
- Yeni mesajlarda scroll
- Ref management

## 📱 Responsive ve Accessibility

### Features
- ✅ Mobile responsive
- ✅ Dark mode support
- ✅ Keyboard navigation
- ✅ Screen reader friendly
- ✅ Touch gestures
- ✅ High contrast support

## 🚀 Geliştirme

### Development Server
```bash
cd frontend
npm run dev
```

### Backend Server
```bash
cd backend
python app.py
```

### Build Production
```bash
cd frontend
npm run build
npm start
```

## 📋 Code Quality

### ESLint Rules
- Next.js best practices
- TypeScript strict mode
- Import organization
- Unused code detection

### File Naming Conventions
- PascalCase for components
- camelCase for hooks ve utilities
- kebab-case for files
- UPPER_CASE for constants

## 🔮 Gelecek Geliştirmeler

### Plananan Özellikler
- [ ] Unit testler
- [ ] Storybook integration
- [ ] Performance monitoring
- [ ] PWA desteği
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] File upload support

Bu modüler yapı sayesinde proje daha maintainable, scalable ve developer-friendly hale gelmiştir.
