import { Bot } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MESSAGES } from '@/constants/config';

export function ChatCardHeader() {
  return (
    <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-t-lg p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-blue-200 dark:border-blue-800">
          <AvatarImage src="/medical-bot-avatar.png" alt="Medical Bot" />
          <AvatarFallback className="bg-blue-100 dark:bg-blue-900">
            <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Medical AI</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {MESSAGES.STATUS_ONLINE}
          </div>
        </div>
      </div>
    </div>
  );
}
