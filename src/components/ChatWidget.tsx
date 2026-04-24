import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: "user" | "bot", text: string}[]>([
    { role: "bot", text: "¡Hola! ¿En qué puedo ayudarte hoy?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Optimistic UI update
    setMessages(prev => [...prev, { role: "user", text: input }]);
    const currentInput = input;
    setInput("");

    // Here we'd send via webhook to the agent system. Simulated response for now.
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "bot", 
        text: "Gracias por tu mensaje. Un asistente estará conectado contigo pronto o puedes agendar una cita directamente desde la pestaña 'Agenda'." 
      }]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-24 right-6 w-80 bg-white rounded-2xl shadow-xl border border-border flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm">Asistente Mentis</h3>
                <p className="text-[10px] text-white/80 uppercase tracking-wider">Conectando vía Webhook</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="h-64 overflow-y-auto p-4 bg-app-bg space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-sm' 
                      : 'bg-white border border-border text-text-main shadow-sm rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-border flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-primary-light/50 border border-transparent rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/30"
              />
              <button 
                onClick={handleSend}
                className="bg-primary text-white p-2 rounded-xl hover:bg-cta transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.10 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center z-40"
      >
        <MessageCircle size={24} />
        {!isOpen && (
           <div className="absolute top-0 right-0 w-4 h-4 bg-orange-dot rounded-full border-2 border-white translate-x-1 -translate-y-1"></div>
        )}
      </motion.button>
    </>
  );
}
