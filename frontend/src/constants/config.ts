export const CHAT_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081',
  CHAT_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT || '/get',
  MAX_MESSAGE_LENGTH: 1000,
  SCROLL_BEHAVIOR: 'smooth' as const,
} as const;

export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Medical AI Assistant',
  DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Your professional medical AI assistant. Ask your health questions and get medical information.',
} as const;

export const UI_CONFIG = {
  CHAT_HEIGHT: 'h-[600px]',
  MESSAGE_AREA_HEIGHT: 'h-[440px]',
  MAX_MESSAGE_WIDTH: 'max-w-[75%]',
  AVATAR_SIZE: {
    SMALL: 'h-8 w-8',
    MEDIUM: 'h-12 w-12',
  },
} as const;

export const ANIMATION_CONFIG = {
  MESSAGE_SLIDE_DURATION: '0.3s',
  PULSE_DURATION: '2s',
  BOUNCE_DELAY: {
    FIRST: '0s',
    SECOND: '0.1s',
    THIRD: '0.2s',
  },
} as const;

export const MESSAGES = {
  WELCOME: 'Hello! I am your Medical AI Assistant. How can I help you? You can ask medical questions and get health information.',
  ERROR: 'Sorry, an error occurred right now. Please try again later.',
  PLACEHOLDER: 'Type your medical question...',
  STATUS_ONLINE: 'Online - How can I help you?',
  DISCLAIMER: '⚠️ This AI assistant is for informational purposes only. For emergencies, please consult a healthcare professional.',
} as const;
