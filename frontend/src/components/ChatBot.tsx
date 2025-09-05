'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Layout } from '@/components/common';
import { 
  ChatCardHeader, 
  MessageList, 
  ChatInput, 
  ChatFooter 
} from '@/components/chat';
import { useChat, useAutoScroll } from '@/hooks';
import { UI_CONFIG } from '@/constants/config';

export default function ChatBot() {
  const { messages, isLoading, sendMessage } = useChat();
  const { scrollAreaRef } = useAutoScroll([messages]);

  return (
    <Layout>
      {/* <ChatHeader /> */}
      <ChatCardHeader />
      <Card
        className={`${UI_CONFIG.CHAT_HEIGHT} shadow-xl border-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm`}
      >
        <MessageList
          messages={messages}
          isLoading={isLoading}
          scrollAreaRef={scrollAreaRef}
        />

        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </Card>

      <ChatFooter />
    </Layout>
  );
}
