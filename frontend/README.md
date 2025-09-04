# Medical ChatBot - Modular Frontend Structure

This project has been refactored into a clean, modular structure using Tailwind CSS.

## 📁 Proje Yapısı

### Frontend Folder Organization

```
frontend/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── globals.css      # Global styles and Tailwind configuration
│   │   ├── layout.tsx       # Main layout
│   │   └── page.tsx         # Main page
│   ├── components/          # All React components
│   │   ├── ui/              # Shadcn/ui base components
│   │   ├── common/          # Shared components
│   │   │   ├── Layout.tsx   # Main layout wrapper
│   │   │   └── index.ts     # Export barrel
│   │   ├── chat/            # Chat related components
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── ChatCardHeader.tsx
│   │   │   ├── MessageItem.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── TypingIndicator.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatFooter.tsx
│   │   │   └── index.ts     # Export barrel
│   │   └── ChatBot.tsx      # Main chat component
│   ├── hooks/               # Custom React hooks
│   │   ├── useChat.ts       # Chat state management
│   │   ├── useAutoScroll.ts # Auto scroll hook
│   │   └── index.ts         # Export barrel
│   ├── services/            # API and external services
│   │   └── chatService.ts   # Chat API service
│   ├── types/               # TypeScript type definitions
│   │   └── chat.ts          # Types for chat
│   ├── constants/           # Constants and configuration
│   │   └── config.ts        # Application configuration
│   └── lib/                 # Utility functions
│       └── utils.ts         # General utilities
└── .env.local               # Environment variables
```

## 🏗️ Benefits of the Modular Structure

### 1. Clean Code Organization
- Each component in its own file
- Related components grouped together
- Barrel exports for clean imports

### 2. Reusability
- Components are independent
- Hooks can be reused across components
- Services are centralized

### 3. Type Safety
- Full type support with TypeScript
- Interfaces in separate files
- Compile-time error detection

### 4. Maintainability
- Easier debugging
- Simpler test writing
- Easier refactoring

## 🎨 Tailwind CSS Kullanımı

### Design System
- **Color Palette**: Modern oklch color space usage
- **Dark Mode**: Automatic theme switching
- **Typography**: Geist font family
- **Spacing**: Consistent spacing scale

### Component Styling
```tsx
// Example: MessageItem component
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

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_API_ENDPOINT=/get
NEXT_PUBLIC_APP_NAME="Medical AI Assistant"
NEXT_PUBLIC_APP_DESCRIPTION="Your professional medical AI assistant"
```

### Constants
```typescript
export const CHAT_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  CHAT_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT || '/get',
  MAX_MESSAGE_LENGTH: 1000,
} as const;
```

## 🎯 Custom Hooks

### useChat Hook
- Message state management
- API calls
- Error handling
- Loading states

### useAutoScroll Hook
- Automatic scroll to bottom
- Scroll on new messages
- Ref management

## 📱 Responsive and Accessibility

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
- camelCase for hooks and utilities
- kebab-case for files
- UPPER_CASE for constants

## 🔮 Gelecek Geliştirmeler

### Planned Features
- [ ] Unit tests
- [ ] Storybook integration
- [ ] Performance monitoring
- [ ] PWA support
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] File upload support

This modular structure makes the project more maintainable, scalable and developer-friendly.
