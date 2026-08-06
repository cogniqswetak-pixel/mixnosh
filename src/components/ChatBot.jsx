import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hey! 👋 Welcome to Mixnosh — India's First Sneaker & Resin Art Cafe! How can I help you today?",
    }
  ]);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickAction = (action) => {
    setMessages((prev) => [...prev, { id: Date.now(), type: 'user', text: action }]);

    setTimeout(() => {
      let botResponse = '';
      if (action === 'Book a Table') {
        botResponse = 'Great! Opening the booking form for you...';
        if (onOpenBooking) onOpenBooking();
      } else if (action === 'Workshop Info') {
        botResponse = 'We host exciting Sneaker Customization and Resin Art workshops! Check out our Workshops section for upcoming dates.';
      } else if (action === 'Menu & Pricing') {
        botResponse = 'Our menu features delicious continental and fusion dishes. Visit the Menu section for details!';
      } else if (action === 'Visit Us') {
        botResponse = 'We are located at HSR Layout and Indiranagar. Open daily from 11 AM to 11 PM. See you soon!';
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
    }, 500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-[84px] right-3 left-3 sm:left-auto sm:right-6 z-50 flex h-[380px] sm:w-80 flex-col overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-zinc-900 p-4 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <span className="font-semibold text-sm">Mixnosh Assistant</span>
              </div>
              <button
                onClick={toggleChat}
                className="rounded-full p-1 text-gray-300 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                      msg.type === 'bot'
                        ? 'self-start rounded-tl-none border border-gray-100 bg-white text-gray-800 shadow-sm'
                        : 'self-end rounded-tr-none bg-orange-500 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="mt-4 flex flex-col gap-2">
                  {['Book a Table', 'Workshop Info', 'Menu & Pricing', 'Visit Us'].map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className="rounded-xl border border-orange-200 bg-orange-50 p-2 text-sm text-orange-700 transition-colors hover:bg-orange-100"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 bg-white p-3">
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                  readOnly
                />
                <button className="text-orange-500 hover:text-orange-600">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleChat}
        className="fixed bottom-20 right-4 sm:right-6 z-50 flex h-[48px] w-[48px] sm:h-[52px] sm:w-[52px] items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        aria-label="Toggle chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
};

export default ChatBot;
