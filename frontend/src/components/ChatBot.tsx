'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Bot, 
  User, 
  Heart, 
  Stethoscope,
  Activity,
  Shield
} from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba! Ben Medical AI Asistanınızım. Size nasıl yardımcı olabilirim? Tıbbi sorularınızı sorabilir, sağlık konularında bilgi alabilirsiniz.',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Backend API çağrısı
      const formData = new FormData();
      formData.append('msg', inputValue);
      
      const response = await fetch('http://localhost:8081/get', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const botResponse = await response.text();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Üzgünüm, şu anda bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Stethoscope className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Medical AI Assistant
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Profesyonel tıbbi AI asistanınız. Sağlık sorularınızı sorun, tıbbi bilgi alın.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Güvenli
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Activity className="w-3 h-3" />
              7/24 Aktif
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              Güvenilir
            </Badge>
          </div>
        </div>

        {/* Chat Card */}
        <Card className="h-[600px] shadow-xl border-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-t-lg">
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
                  Online - Size nasıl yardımcı olabilirim?
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 h-[440px]">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.isBot && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-blue-100 dark:bg-blue-900">
                          <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
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
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-blue-100 dark:bg-blue-900">
                          <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-blue-100 dark:bg-blue-900">
                        <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="border-t bg-gray-50 dark:bg-slate-850 rounded-b-lg">
            <form onSubmit={sendMessage} className="flex w-full gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tıbbi sorunuzu yazın..."
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
          </CardFooter>
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            ⚠️ Bu AI asistan sadece bilgi amaçlıdır. Acil durumlar için mutlaka bir sağlık uzmanına başvurun.
          </p>
        </div>
      </div>
    </div>
  );
}
