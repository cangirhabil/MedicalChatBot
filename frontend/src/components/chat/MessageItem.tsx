import { Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import type { Message } from '@/types/chat';
import { UI_CONFIG } from '@/constants/config';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div
      className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
    >
      {message.isBot && (
        <Avatar className={`${UI_CONFIG.AVATAR_SIZE.SMALL} mt-1`}>
          <AvatarFallback className="bg-blue-100 dark:bg-blue-900">
            <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={`${UI_CONFIG.MAX_MESSAGE_WIDTH} rounded-2xl px-4 py-3 ${
          message.isBot
            ? 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white'
            : 'bg-blue-600 text-white ml-auto'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>
        <p
          className={`text-xs mt-2 ${
            message.isBot
              ? 'text-gray-500 dark:text-gray-400'
              : 'text-blue-100'
          }`}
        >
          {format(message.timestamp, 'HH:mm')}
        </p>
      </div>

      {!message.isBot && (
        <Avatar className={`${UI_CONFIG.AVATAR_SIZE.SMALL} mt-1`}>
          <AvatarFallback className="bg-blue-100 dark:bg-blue-900">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
