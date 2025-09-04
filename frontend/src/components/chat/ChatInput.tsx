import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MESSAGES } from '@/constants/config';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="border-t bg-gray-50 dark:bg-slate-850 rounded-b-lg p-4">
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={MESSAGES.PLACEHOLDER}
          disabled={isLoading}
          className="flex-1 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
        />
        <Button 
          type="submit" 
          disabled={!inputValue.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
