export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  answer: string;
}

export interface ChatError {
  message: string;
  code?: string;
}
