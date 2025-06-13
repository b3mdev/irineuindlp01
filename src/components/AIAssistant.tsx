import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, Zap } from 'lucide-react';

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

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', email: '', phone: '' });
  const [conversationStep, setConversationStep] = useState<'initial' | 'name' | 'phone' | 'email' | 'complete'>('initial');
  const [currentSection, setCurrentSection] = useState('home');
  const [isTyping, setIsTyping] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Contextual messages based on current section
  const contextualMessages = {
    home: [
      "👋 Vejo que você está na página inicial! Posso ajudá-lo a encontrar o lote industrial perfeito para seu negócio!",
      "🏭 Que tipo de indústria você pretende instalar? Isso me ajudará a recomendar o melhor lote.",
      "💼 Você já tem experiência com investimentos industriais? Posso personalizar minhas sugestões!"
    ],
    lotes: [
      "🎯 Vejo que você está analisando nossos lotes disponíveis. Posso explicar as vantagens de cada setor!",
      "📏 Qual é o tamanho ideal de lote para sua operação industrial?",
      "💰 Gostaria de saber sobre as condições de financiamento disponíveis? Temos ótimas opções!"
    ],
    vantagens: [
      "⭐ Excelente! Você está conhecendo nossos diferenciais. Qual benefício mais chamou sua atenção?",
      "🔌 A infraestrutura completa é um dos nossos maiores atrativos. Tem alguma dúvida específica?",
      "📅 Posso agendar uma visita técnica para você conhecer pessoalmente?"
    ],
    localizacao: [
      "🗺️ A localização é estratégica mesmo! Sua empresa precisa de acesso específico a alguma rodovia?",
      "🚛 Que tipo de logística sua indústria vai precisar? Posso mostrar as melhores rotas.",
      "⏱️ Gostaria de saber sobre o tempo de deslocamento para fornecedores da região?"
    ],
    contato: [
      "🚀 Ótimo! Vejo que está pronto para dar o próximo passo. Como posso ajudá-lo?",
      "🤝 Prefere agendar uma reunião presencial ou uma apresentação online?",
      "📊 Posso preparar uma análise personalizada de investimento para você!"
    ]
  };

  // Enhanced AI responses with emojis
  const getAIResponse = (userMessage: string): string => {
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
  };

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Detect current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'lotes', 'vantagens', 'localizacao', 'contato'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (section !== currentSection) {
              setCurrentSection(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  // Show contextual message when section changes
  useEffect(() => {
    if (conversationStep === 'complete' && contextualMessages[currentSection as keyof typeof contextualMessages]) {
      const contextMessages = contextualMessages[currentSection as keyof typeof contextualMessages];
      const randomMessage = contextMessages[Math.floor(Math.random() * contextMessages.length)];
      
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const newMessage: Message = {
            id: Date.now().toString(),
            text: randomMessage,
            sender: 'assistant',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, newMessage]);
          setIsTyping(false);
        }, 2000);
      }, 1500);
    }
  }, [currentSection, conversationStep]);

  // Initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: 'welcome',
          text: "🤖 Olá! Sou o Machado, seu corretor digital especializado em lotes industriais. Para oferecer o melhor atendimento, preciso conhecer você melhor. Poderia me informar seu nome?",
          sender: 'assistant',
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
        setConversationStep('name');
        setIsTyping(false);
      }, 1500);
    }
  }, [isOpen, messages.length]);

  // Pulse effect control
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPulse(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
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

    // Handle conversation flow
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
    }, 1500 + Math.random() * 1000);
  };

  return (
    <>
      {/* Floating Assistant Button with Enhanced Animations */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Pulse rings */}
          {showPulse && !isOpen && (
            <>
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse opacity-30 scale-110"></div>
            </>
          )}
          
          {/* Notification badge */}
          {!isOpen && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
              <Sparkles size={12} />
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 ${
              isOpen ? 'rotate-180' : 'hover:rotate-12'
            }`}
          >
            {isOpen ? (
              <X size={24} className="transition-transform duration-300" />
            ) : (
              <Bot size={24} className="transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Chat Window with Enhanced Design */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white p-6 relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
            </div>
            
            <div className="flex items-center relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 animate-pulse">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Machado</h3>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <p className="text-blue-100 text-sm">Corretor Digital • Online</p>
                </div>
              </div>
              <div className="ml-auto">
                <Zap size={20} className="text-yellow-300 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Messages with Enhanced Styling */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-${message.sender === 'user' ? 'right' : 'left'}-4 duration-500`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`max-w-xs p-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 ${
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
              <div className="flex justify-start animate-in slide-in-from-left-4 duration-300">
                <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-lg border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input with Enhanced Design */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
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

export default AIAssistant;