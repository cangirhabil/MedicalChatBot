import { Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UI_CONFIG, ANIMATION_CONFIG } from '@/constants/config';

export function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <Avatar className={`${UI_CONFIG.AVATAR_SIZE.SMALL} mt-1`}>
        <AvatarFallback className="bg-blue-100 dark:bg-blue-900">
          <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
        <div className="flex space-x-1">
          <div 
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: ANIMATION_CONFIG.BOUNCE_DELAY.FIRST }}
          />
          <div 
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: ANIMATION_CONFIG.BOUNCE_DELAY.SECOND }}
          />
          <div 
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: ANIMATION_CONFIG.BOUNCE_DELAY.THIRD }}
          />
        </div>
      </div>
    </div>
  );
}
