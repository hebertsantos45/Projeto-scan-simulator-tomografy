import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, X, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function VirtualTutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Olá! Sou seu tutor virtual de Tomografia. Posso ajudar com protocolos, anatomia ou ajustes técnicos. O que você gostaria de saber?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    // Mock AI response logic
    setTimeout(() => {
      let response = "Interessante pergunta. Na tomografia, isso geralmente depende do protocolo específico.";
      
      if (userMsg.toLowerCase().includes('kv')) {
        response = "O kV (Kilovoltagem) determina a penetração do feixe de raios-X. Aumentar o kV reduz o contraste da imagem mas ajuda a penetrar estruturas densas. Para angiotomografias, geralmente usamos kVs mais baixos (80-100) para aumentar o realce do iodo.";
      } else if (userMsg.toLowerCase().includes('mas')) {
        response = "O mAs (Miliamperagem-segundo) controla a quantidade de fótons. Aumentar o mAs reduz o ruído da imagem, mas aumenta a dose de radiação para o paciente linearmente. Sempre busque o princípio ALARA (As Low As Reasonably Achievable).";
      } else if (userMsg.toLowerCase().includes('pitch')) {
        response = "O Pitch é a relação entre o movimento da mesa e a espessura do feixe. Pitch > 1 estica a hélice (mais rápido, menos dose, menor resolução longitudinal). Pitch < 1 sobrepõe a hélice (mais dose, melhor qualidade).";
      } else if (userMsg.toLowerCase().includes('crânio') || userMsg.toLowerCase().includes('cranio')) {
        response = "Para TC de Crânio, o posicionamento padrão é com a Linha Orbitomeatal (LOM) paralela ao gantry. Isso evita irradiação desnecessária do cristalino. Use janela de partes moles (W:80 L:40) e óssea (W:2500 L:500).";
      }

      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <Button 
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-violet-600 hover:bg-violet-700 z-50 animate-bounce"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="w-8 h-8" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in border-violet-200 dark:border-violet-900">
          <CardHeader className="bg-violet-600 text-white rounded-t-lg py-3 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <CardTitle className="text-base">Tutor Virtual IA</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-violet-700 h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 overflow-hidden bg-slate-50 dark:bg-slate-900">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "flex w-full",
                      msg.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                      msg.role === 'user' 
                        ? "bg-violet-600 text-white rounded-br-none" 
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-3 border-t bg-white dark:bg-slate-900">
            <form 
              className="flex w-full gap-2"
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            >
              <Input 
                placeholder="Pergunte sobre kV, mAs, protocolos..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-violet-600 hover:bg-violet-700">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
