import { CHAT_CONFIG } from '@/constants/config';

class ChatService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = CHAT_CONFIG.API_BASE_URL;
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('msg', message);

      const response = await fetch(`${this.baseUrl}${CHAT_CONFIG.CHAT_ENDPOINT}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const botResponse = await response.text();
      return botResponse;
    } catch (error) {
      console.error('Chat service error:', error);
      throw new Error('Failed to send message');
    }
  }
}

export const chatService = new ChatService();
