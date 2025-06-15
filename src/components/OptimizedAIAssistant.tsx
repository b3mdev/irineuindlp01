import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, Zap } from 'lucide-react';
import { useReducedMotion } from './AnimationOptimizer';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

const OptimizedAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', email: '', phone: '' });
  const [conversationStep, setConversationStep] = useState<'initial' | 'name' | 'phone' | 'email' | 'complete'>('initial');
  const [isTyping, setIsTyping] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Optimized scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: prefersReducedMotion ? 'auto' : 'smooth' 
      });
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Optimized pulse effect with reduced motion support
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowPulse(false);
      return;
    }

    const interval = setInterval(() => {
      setShowPulse(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Enhanced AI responses
  const getAIResponse = useCallback((userMessage: string): string => {
    const responses = [
      "🎯 Entendo sua necessidade! Com base no que você me contou, recomendo analisar os lotes do Setor A ou C.",
      "💡 Excelente pergunta! Nossa equipe técnica pode fornecer todos os detalhes sobre infraestrutura.",
      "📅 Posso agendar uma visita técnica gratuita para você. Qual seria o melhor dia da semana?",
      "💰 Temos condições especiais de pagamento para empresários. Gostaria de conhecer as opções?",
      "🎉 Baseado no seu perfil, acredito que temos a solução ideal. Vou conectar você com nosso especialista.",
      "📈 Ótima escolha! Este tipo de investimento tem se valorizado muito na região.",
      "📊 Posso preparar um relatório personalizado com projeções financeiras. Seria útil?",
      "⚖️ Nossa equipe jurídica garante toda a documentação regularizada. Isso é importante para você?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }, []);

  // Initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        const welcomeMessage: Message = {
          id: 'welcome',
          text: "🤖 Olá! Sou o Machado, seu corretor digital especializado em lotes industriais. Para oferecer o melhor atendimento, preciso conhecer você melhor. Poderia me informar seu nome?",
          sender: 'assistant',
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
        setConversationStep('name');
        setIsTyping(false);
      }, prefersReducedMotion ? 100 : 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, prefersReducedMotion]);

  const handleSendMessage = useCallback(() => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    const responseDelay = prefersReducedMotion ? 300 : 1000;

    setTimeout(() => {
      let aiResponse = '';
      
      switch (conversationStep) {
        case 'name':
          setUserInfo(prev => ({ ...prev, name: currentInput }));
          aiResponse = `Prazer em conhecer você, ${currentInput}! Agora, para mantermos contato, poderia me passar seu número de WhatsApp?`;
          setConversationStep('phone');
          break;
          
        case 'phone':
          setUserInfo(prev => ({ ...prev, phone: currentInput }));
          aiResponse = `Ótimo! Por último, qual é o seu melhor e-mail para receber nossas comunicações?`;
          setConversationStep('email');
          break;
          
        case 'email':
          setUserInfo(prev => ({ ...prev, email: currentInput }));
          aiResponse = `Perfeito! Agora podemos continuar nossa conversa. Como posso ajudar você hoje? 🎉`;
          setConversationStep('complete');
          break;
          
        case 'complete':
          aiResponse = getAIResponse(currentInput);
          break;
          
        default:
          aiResponse = getAIResponse(currentInput);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, responseDelay);
  }, [inputMessage, conversationStep, getAIResponse, prefersReducedMotion]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Animation classes with reduced motion support
  const getAnimationClass = (type: 'slide-in' | 'bounce' | 'pulse' | 'scale') => {
    if (prefersReducedMotion) return '';
    
    switch (type) {
      case 'slide-in':
        return 'animate-in slide-in-from-bottom-4 duration-300';
      case 'bounce':
        return 'animate-bounce';
      case 'pulse':
        return 'animate-pulse';
      case 'scale':
        return 'hover:scale-110 transition-transform duration-200';
      default:
        return '';
    }
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Pulse rings */}
          {showPulse && !isOpen && !prefersReducedMotion && (
            <>
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse opacity-30 scale-110"></div>
            </>
          )}
          
          {/* Notification badge */}
          {!isOpen && (
            <div className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center ${getAnimationClass('bounce')}`}>
              <Sparkles size={12} />
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 ${getAnimationClass('scale')} ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
          >
            {isOpen ? (
              <X size={24} className="transition-transform duration-300" />
            ) : (
              <Bot size={24} className="transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden ${getAnimationClass('slide-in')}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white p-6 relative overflow-hidden">
            <div className="flex items-center relative z-10">
              <div className={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 ${!prefersReducedMotion ? 'animate-pulse' : ''}`}>
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Machado</h3>
                <div className="flex items-center">
                  <div className={`w-2 h-2 bg-green-400 rounded-full mr-2 ${!prefersReducedMotion ? 'animate-pulse' : ''}`}></div>
                  <p className="text-blue-100 text-sm">Corretor Digital • Online</p>
                </div>
              </div>
              <div className="ml-auto">
                <Zap size={20} className={`text-yellow-300 ${getAnimationClass('bounce')}`} />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${getAnimationClass('slide-in')}`}
                style={{ animationDelay: prefersReducedMotion ? '0ms' : `${index * 100}ms` }}
              >
                <div
                  className={`max-w-xs p-4 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className={`flex justify-start ${getAnimationClass('slide-in')}`}>
                <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-lg border border-gray-200">
                  <div className="flex space-x-1">
                    <div className={`w-2 h-2 bg-blue-500 rounded-full ${!prefersReducedMotion ? 'animate-bounce' : ''}`}></div>
                    <div className={`w-2 h-2 bg-blue-500 rounded-full ${!prefersReducedMotion ? 'animate-bounce' : ''}`} style={{ animationDelay: '0.1s' }}></div>
                    <div className={`w-2 h-2 bg-blue-500 rounded-full ${!prefersReducedMotion ? 'animate-bounce' : ''}`} style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg disabled:cursor-not-allowed"
                aria-label="Enviar mensagem"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OptimizedAIAssistant;