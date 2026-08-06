import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── GROQ API KEY ──
const GROQ_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Clear stale AQ... tokens from localStorage
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('gemini_api_key') || '';
  if (stored && !stored.startsWith('gsk_') && !stored.startsWith('AIzaSy')) {
    localStorage.removeItem('gemini_api_key');
  }
}

const getActiveKey = () => localStorage.getItem('gemini_api_key') || GROQ_KEY;

// ── LOCAL KNOWLEDGE BASE ──
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
    response: "📅 You can book a table or an art experience slot right here! I can launch the Booking Panel for you."
  },
  {
    keywords: ['menu', 'food', 'drink', 'price', 'pricing', 'coffee', 'pasta', 'burger', 'pav bhaji', 'eat', 'dessert'],
    response: "🍔 Our menu is freshly crafted! Popular items:\n• Pav Bhaji with Egg Burji (₹280)\n• Tangy Creamy Blush Pasta (₹340)\n• Gourmet Artisan Burger (₹320)\n• Cozy Hot Chocolate (₹220)\nVisit the interactive Menu Journal section above!"
  },
  {
    keywords: ['timing', 'timings', 'time', 'open', 'hour', 'hours', 'close', 'closing'],
    response: "🕒 We are open daily from 11:00 AM to 11:00 PM!"
  },
  {
    keywords: ['cafe', 'mixnosh', 'about', 'info', 'information', 'details', 'tell', 'share', 'more'],
    response: "🌟 Mixnosh is India's First Sneaker & Resin Art Cafe in Bengaluru! Enjoy gourmet food, custom paint sneakers, and create epoxy resin art — all under one roof. Branches in HSR Layout and Indiranagar!"
  },
  {
    keywords: ['question', 'questions', 'ask', 'help', 'capabilities', 'features'],
    response: "💬 You can ask me about:\n• 📍 Our locations\n• 🎨 Art workshops\n• 🍔 Menu & pricing\n• 🕒 Timings\n• 📅 Booking a table or experience"
  },
  {
    keywords: ['hi', 'hello', 'hey', 'sup', 'yo'],
    response: "👋 Hello! I am the Mixnosh Assistant. How can I help you today?"
  }
];

const getLocalResponse = (query) => {
  const q = query.toLowerCase();
  for (const item of localKnowledge) {
    if (item.keywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(q))) return item.response;
  }
  return "😊 I didn't quite catch that! Try asking about our menu, workshops, locations, timings, or how to book a table.";
};

// ── AI API CALL ──
const askAI = async (userText, key) => {
  const systemPrompt = `You are the Mixnosh Assistant for Mixnosh Cafe — India's First Sneaker & Resin Art Cafe in Bengaluru (HSR Layout & Indiranagar). Menu: Pav Bhaji Egg Burji ₹280, Blush Pasta ₹340, Artisan Burger ₹320, Hot Chocolate ₹220. Workshops: Custom Kicks, Epoxy Resin Decor. Hours: 11 AM–11 PM daily. Be friendly, brief (2-3 sentences), warm. Always invite them to visit!`;

  try {
    if (key.startsWith('gsk_')) {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userText }],
          max_tokens: 300, temperature: 0.7,
        }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.choices?.[0]?.message?.content?.trim() || null;
    } else if (key.startsWith('AIzaSy')) {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\nUser: ${userText}` }] }],
          generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
        }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
    }
    return null;
  } catch { return null; }
};

const ChatBot = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hey! 👋 Welcome to Mixnosh — India's First Sneaker & Resin Art Cafe!\nHow can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const activeKey = getActiveKey();

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;
    if (!textToSend) setInputValue('');

    setMessages(p => [...p, { id: Date.now(), type: 'user', text }]);
    setIsLoading(true);

    let reply = '';
    if (activeKey) {
      reply = await askAI(text, activeKey) || getLocalResponse(text);
    } else {
      await new Promise(r => setTimeout(r, 500));
      reply = getLocalResponse(text);
    }

    if (text === 'Book a Table' && onOpenBooking) setTimeout(() => onOpenBooking(), 500);

    setMessages(p => [...p, { id: Date.now() + 1, type: 'bot', text: reply }]);
    setIsLoading(false);
  };

  const quickActions = [
    { label: '📅 Book a Table', value: 'Book a Table' },
    { label: '🎨 Workshop Info', value: 'Workshop Info' },
    { label: '🍔 Menu & Pricing', value: 'Menu & Pricing' },
    { label: '📍 Visit Us', value: 'Visit Us' },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            className="fixed bottom-[84px] right-3 left-3 sm:left-auto sm:right-6 z-50 flex sm:w-[380px] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            style={{ height: 'min(580px, calc(100dvh - 120px))' }}
          >
            {/* ── HEADER ── */}
            <div
              className="relative shrink-0 px-5 py-4 text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              }}
            >
              {/* Decorative circle accents */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-orange-500/10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-amber-500/8" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    {/* Online dot */}
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#1a1a2e]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm tracking-tight">Mixnosh Assistant</h3>
                    <p className="text-[10px] text-blue-200/70 font-medium">Online • Typically replies instantly</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl p-2 text-blue-200/60 hover:bg-white/10 hover:text-white transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ── MESSAGES ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4" style={{ background: 'linear-gradient(180deg, #f5f5f5 0%, #fafafa 100%)' }}>
              <div className="flex flex-col gap-3">
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`max-w-[85%] whitespace-pre-wrap ${
                      msg.type === 'bot'
                        ? 'self-start'
                        : 'self-end'
                    }`}
                  >
                    {msg.type === 'bot' && (
                      <div className="flex gap-2">
                        <div className="shrink-0 mt-1 h-6 w-6 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm">
                          <MessageCircle className="h-3 w-3 text-white" />
                        </div>
                        <div className="rounded-2xl rounded-tl-md bg-white border border-neutral-100 px-3.5 py-2.5 text-[13px] leading-relaxed text-neutral-700 shadow-sm">
                          {msg.text}
                        </div>
                      </div>
                    )}
                    {msg.type === 'user' && (
                      <div className="rounded-2xl rounded-tr-md bg-gradient-to-r from-orange-500 to-amber-500 px-3.5 py-2.5 text-[13px] leading-relaxed text-white shadow-sm">
                        {msg.text}
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="self-start flex gap-2"
                  >
                    <div className="shrink-0 mt-1 h-6 w-6 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm">
                      <MessageCircle className="h-3 w-3 text-white" />
                    </div>
                    <div className="rounded-2xl rounded-tl-md bg-white border border-neutral-100 px-4 py-3 shadow-sm flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 2 && !isLoading && (
                <div className="mt-4">
                  <p className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest mb-2 px-1">Quick Actions</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map(a => (
                      <button
                        key={a.value}
                        onClick={() => handleSend(a.value)}
                        className="rounded-xl border border-orange-100 bg-white px-3 py-2.5 text-left text-xs font-semibold text-neutral-700 transition-all hover:border-orange-300 hover:bg-orange-50 hover:shadow-sm cursor-pointer"
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── INPUT BAR ── */}
            <div className="shrink-0 border-t border-neutral-100 bg-white p-3">
              <form
                onSubmit={e => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <div className="flex-1 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-neutral-400 text-neutral-800"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-30 disabled:shadow-none"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="text-center text-[9px] text-neutral-300 mt-2 font-medium">Powered by Mixnosh AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FLOATING OPEN BUTTON ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 sm:right-6 z-50 group flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/30 transition-all hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/40 focus:outline-none"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-20" />
        </button>
      )}
    </>
  );
};

export default ChatBot;
