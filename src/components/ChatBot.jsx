import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── GROQ API KEY (loaded from env, clears any stale localStorage token) ──
const GROQ_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Clear any old expired AQ... tokens from localStorage so they don't override
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('gemini_api_key') || '';
  if (stored && !stored.startsWith('gsk_') && !stored.startsWith('AIzaSy')) {
    localStorage.removeItem('gemini_api_key');
  }
}

const getActiveKey = () => {
  const stored = localStorage.getItem('gemini_api_key') || '';
  return stored || GROQ_KEY;
};

// ── LOCAL OFFLINE KNOWLEDGE BASE ──
const localKnowledge = [
  {
    keywords: ['location', 'where', 'address', 'branch', 'hsr', 'indiranagar'],
    response: "📍 Mixnosh Cafe has two branches in Bengaluru:\n1. HSR Layout: Near Sector 3.\n2. Indiranagar: Near 100 Feet Road.\nWe'd love to have you visit!"
  },
  {
    keywords: ['workshop', 'workshops', 'sneaker', 'sneakers', 'resin', 'art', 'custom', 'paint', 'painting', 'class'],
    response: "🎨 We are India's First Sneaker & Resin Art Cafe! We host:\n• Custom Kicks Workshop: Design & paint your sneakers.\n• Epoxy Resin Decor: Create custom coasters, trays, and art pieces.\nWe provide all premium supplies! Would you like to book a slot?"
  },
  {
    keywords: ['book', 'booking', 'table', 'reserve', 'reservation', 'slot', 'dining', 'seat'],
    response: "📅 You can book a table or an art experience slot right here! I can launch the Booking Panel for you. Shall we do that?"
  },
  {
    keywords: ['menu', 'food', 'drink', 'price', 'pricing', 'coffee', 'pasta', 'burger', 'pav bhaji', 'eat', 'dessert'],
    response: "🍔 Our menu is freshly crafted! Popular items:\n• Pav Bhaji with Egg Burji (₹280)\n• Tangy Creamy Blush Pasta (₹340)\n• Gourmet Artisan Burger (₹320)\n• Cozy Hot Chocolate (₹220)\nVisit the interactive Menu Journal section above to view the full list!"
  },
  {
    keywords: ['timing', 'timings', 'time', 'open', 'hour', 'hours', 'close', 'closing'],
    response: "🕒 We are open daily from 11:00 AM to 11:00 PM!"
  },
  {
    keywords: ['cafe', 'mixnosh', 'about', 'info', 'information', 'details', 'tell'],
    response: "🌟 Mixnosh is India's First Sneaker & Resin Art Cafe in Bengaluru! It's a unique creative space where you can enjoy gourmet food, custom paint sneakers, and create epoxy resin art all under one roof. We have branches in HSR Layout and Indiranagar!"
  },
  {
    keywords: ['question', 'questions', 'ask', 'help', 'capabilities', 'features'],
    response: "💬 You can ask me about:\n• 📍 Our locations (HSR Layout & Indiranagar)\n• 🎨 Art workshops (Sneaker customization & Resin decor)\n• 🍔 Our menu food items & pricing\n• 🕒 Opening timings & hours\n• 📅 How to book a table or experience slot"
  },
  {
    keywords: ['hi', 'hello', 'hey', 'sup', 'yo'],
    response: "👋 Hello! I am the Mixnosh Assistant. How can I help you discover India's first Sneaker & Resin Art Cafe today?"
  }
];

const getLocalResponse = (query) => {
  const q = query.toLowerCase();
  for (const item of localKnowledge) {
    const matches = item.keywords.some(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      return regex.test(q);
    });
    if (matches) return item.response;
  }
  return "🤖 I didn't quite catch that! Try asking about our menu, workshops, location, timings, or how to book a table. I'm here to help! 😊";
};

// ── AI API CALL (Groq primary, Gemini fallback) ──
const askAI = async (userText, key) => {
  const systemPrompt = `You are the Mixnosh Assistant, a friendly and helpful AI host for Mixnosh Cafe.
Mixnosh is India's First Sneaker & Resin Art Cafe, located in Bengaluru (HSR Layout and Indiranagar branches).
We offer premium custom painted sneakers, resin art workshops, and top-tier gourmet fusion food.
Cafe Hours: 11:00 AM to 11:00 PM daily.

Menu highlights:
- Pav Bhaji with Egg Burji (₹280)
- Tangy Creamy Blush Pasta (₹340)
- Gourmet Artisan Burger (₹320)
- Smoked Paprika Arrabbiata (₹310)
- Cozy Hot Chocolate (₹220)
- Classic Hazelnut Cold Brew (₹240)

Workshops:
- Custom Kicks Workshop (Sneaker customization)
- Epoxy Resin Decor (Resin coasters, clocks, trays)

Keep responses friendly, warm, helpful, and brief (2-3 sentences max). Always invite the user to visit!`;

  const isGroq = key.startsWith('gsk_');
  const isGemini = key.startsWith('AIzaSy');

  try {
    if (isGroq) {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userText },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Error ${res.status}`);
      }
      const data = await res.json();
      return data.choices?.[0]?.message?.content?.trim() || "I couldn't process that. Please try again!";

    } else if (isGemini) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${systemPrompt}\n\nUser: ${userText}` }] }],
            generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
          }),
        }
      );
      if (!res.ok) throw new Error(`Gemini Error ${res.status}`);
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "I couldn't process that. Please try again!";
    }

    // Unknown key type — fall through to local
    return null;
  } catch (err) {
    console.error('AI Error:', err);
    return null; // Fall through to local knowledge
  }
};

const ChatBot = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hey! 👋 Welcome to Mixnosh — India's First Sneaker & Resin Art Cafe! How can I help you today?",
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const activeKey = getActiveKey();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const promptText = textToSend || inputValue.trim();
    if (!promptText) return;
    if (!textToSend) setInputValue('');

    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: promptText }]);
    setIsLoading(true);

    let botResponse = '';
    if (activeKey) {
      const aiReply = await askAI(promptText, activeKey);
      botResponse = aiReply || getLocalResponse(promptText);
    } else {
      await new Promise(r => setTimeout(r, 600));
      botResponse = getLocalResponse(promptText);
    }

    if (promptText === 'Book a Table' && onOpenBooking) {
      setTimeout(() => onOpenBooking(), 500);
    }

    setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-[84px] right-3 left-3 sm:left-auto sm:right-6 z-50 flex sm:w-[360px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
            style={{ height: 'min(560px, calc(100vh - 120px))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-zinc-900 px-4 py-3.5 text-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm tracking-tight">Mixnosh Assistant</span>
                    {activeKey && (
                      <span className="flex items-center gap-0.5 rounded bg-orange-500/20 px-1.5 py-0.5 text-[9px] font-black uppercase text-orange-400 tracking-wide">
                        <Sparkles className="h-2.5 w-2.5" /> Live AI
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-400 font-medium">Online & ready to help</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-neutral-400 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto bg-[#f9f9f9] p-4">
              <div className="flex flex-col gap-3">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.type === 'bot'
                        ? 'self-start rounded-tl-none border border-neutral-200/70 bg-white text-neutral-800 shadow-sm'
                        : 'self-end rounded-tr-none bg-zinc-900 text-white shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}

                {isLoading && (
                  <div className="self-start rounded-2xl rounded-tl-none border border-neutral-200/70 bg-white px-4 py-3 shadow-sm flex items-center gap-2">
                    <RefreshCw className="h-3 w-3 animate-spin text-orange-500" />
                    <span className="text-xs text-neutral-400">Thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions — show when chat is fresh */}
              {messages.length <= 2 && !isLoading && (
                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider mb-1">Suggested topics</span>
                  {['Book a Table', 'Workshop Info', 'Menu & Pricing', 'Visit Us'].map(action => (
                    <button
                      key={action}
                      onClick={() => handleSendMessage(action)}
                      className="w-full rounded-xl border border-orange-100 bg-orange-50/60 px-4 py-2.5 text-left text-xs font-bold text-orange-800 transition-all hover:bg-orange-100 hover:border-orange-200 cursor-pointer"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="border-t border-neutral-100 bg-white p-3 shrink-0">
              <form
                onSubmit={e => { e.preventDefault(); handleSendMessage(); }}
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Ask me anything about Mixnosh..."
                  className="flex-1 bg-transparent text-xs outline-none placeholder:text-neutral-400 text-neutral-800"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="text-orange-500 hover:text-orange-600 disabled:opacity-30 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 sm:right-6 z-50 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-400 text-white shadow-xl transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default ChatBot;
