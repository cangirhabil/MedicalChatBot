import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageItem } from './MessageItem';
import { TypingIndicator } from './TypingIndicator';
import type { Message } from '@/types/chat';
import { UI_CONFIG } from '@/constants/config';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
}

export function MessageList({ messages, isLoading, scrollAreaRef }: MessageListProps) {
  return (
    <div className="p-0 h-[440px]">
      <ScrollArea className={`${UI_CONFIG.MESSAGE_AREA_HEIGHT} p-4`} ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          
          {isLoading && <TypingIndicator />}
        </div>
      </ScrollArea>
    </div>
  );
}
