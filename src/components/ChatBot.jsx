import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Key, Settings, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Basic Local Mock Knowledge Base fallback when no API key is provided
const localKnowledge = [
  {
    keywords: ['location', 'where', 'address', 'branch', 'hsr', 'indiranagar'],
    response: "📍 Mixnosh Cafe has two branches in Bengaluru: \n1. HSR Layout: Near Sector 3.\n2. Indiranagar: Near 100 Feet Road.\nWe'd love to have you visit!"
  },
  {
    keywords: ['workshop', 'sneaker', 'resin', 'art', 'custom', 'paint', 'class'],
    response: "🎨 We are India's First Sneaker & Resin Art Cafe! We host:\n• Custom Kicks Workshop (Sneaker painting - we provide the sneakers or you can bring yours)\n• Epoxy Resin Decor (Resin art keychains, coasters, and clocks)\nWould you like to book one?"
  },
  {
    keywords: ['book', 'table', 'reserve', 'reservation', 'slot', 'dining'],
    response: "📅 You can book a table or art experience right here! I can open the Booking Panel for you. Shall we do that? (Or click the 'Book Experience' button on top!)"
  },
  {
    keywords: ['menu', 'food', 'drink', 'price', 'coffee', 'pasta', 'burger', 'pav bhaji'],
    response: "🍔 Our menu is freshly crafted! Popular items:\n• Pav Bhaji with Egg Burji (₹280)\n• Tangy Creamy Blush Pasta (₹340)\n• Gourmet Artisan Burger (₹320)\n• Cozy Hot Chocolate (₹220)\n• Cold Brews & Iced Teas.\nExplore the Menu Journal section on our site!"
  },
  {
    keywords: ['timing', 'time', 'open', 'hour', 'close', 'schedule'],
    response: "🕒 We are open daily from 11:00 AM to 11:00 PM!"
  },
  {
    keywords: ['hi', 'hello', 'hey', 'sup', 'yo'],
    response: "👋 Hello! I am the Mixnosh Assistant. How can I help you discover India's first Sneaker & Resin Art Cafe today?"
  }
];

const getLocalResponse = (query) => {
  const q = query.toLowerCase();
  for (const item of localKnowledge) {
    if (item.keywords.some(keyword => q.includes(keyword))) {
      return item.response;
    }
  }
  return "🤖 I am currently running in offline mode. Paste your Gemini API key in the chat settings (gear icon ⚙️) to unlock full conversation capabilities! \n\nMixnosh Quick Info:\n• Open 11 AM - 11 PM\n• Locations: HSR Layout & Indiranagar\n• Booking: Select 'Book a Table' or 'Workshop Info' below.";
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
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [keySaved, setKeySaved] = useState(false);

  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSaveKey = (e) => {
    e.preventDefault();
    const cleanKey = tempApiKey.trim();
    setApiKey(cleanKey);
    localStorage.setItem('gemini_api_key', cleanKey);
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowSettings(false);
    }, 1200);

    // Append bot confirmation message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'bot',
        text: cleanKey
          ? "🔑 Gemini API Key configured successfully! I will now respond using live Google Gemini intelligence. Ask me anything!"
          : "ℹ️ API Key removed. Reverted to local fallback response assistant."
      }
    ]);
  };

  const askGeminiAPI = async (userText, history) => {
    const systemPrompt = `You are the Mixnosh Assistant, a friendly and helpful AI host for Mixnosh Cafe.
Mixnosh is India's First Sneaker & Resin Art Cafe, located in Bengaluru (HSR Layout and Indiranagar).
We offer premium custom painted sneakers, resin art workshops, custom resin keychains/coasters, and top-tier gourmet fusion food.
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

Answer the user's questions in a friendly, conversational, and relatively brief manner (under 3-4 sentences if possible). Be warm and invite them to visit!`;

    // Map React message state to Gemini API content format
    const contents = [];
    // Inject system instructions in systemInstruction parameter or prepended to input prompt
    const promptToSend = `${systemPrompt}\n\nUser Question: ${userText}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: promptToSend }],
              },
            ],
            generationConfig: {
              maxOutputTokens: 250,
              temperature: 0.7,
            }
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        return generatedText.trim();
      }
      return "I couldn't process that response. Please try again!";
    } catch (err) {
      console.error(err);
      return `⚠️ Gemini API Error: ${err.message || 'Unable to fetch response'}. Please verify your API Key.`;
    }
  };

  const handleSendMessage = async (textToSend) => {
    const promptText = textToSend || inputValue.trim();
    if (!promptText) return;

    if (!textToSend) {
      setInputValue('');
    }

    // Add user message
    setMessages((prev) => [...prev, { id: Date.now(), type: 'user', text: promptText }]);
    setIsLoading(true);

    // Call API or Fallback
    let botResponse = '';
    if (apiKey) {
      botResponse = await askGeminiAPI(promptText, messages);
    } else {
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 800));
      botResponse = getLocalResponse(promptText);

      // Handle interactive hooks for quick booking
      if (promptText === 'Book a Table') {
        if (onOpenBooking) {
          setTimeout(() => onOpenBooking(), 500);
        }
      }
    }

    setMessages((prev) => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed bottom-[84px] right-3 left-3 sm:left-auto sm:right-6 z-50 flex h-[500px] sm:w-[360px] flex-col overflow-hidden rounded-2xl border border-[#3d2e24]/20 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-zinc-900 p-4 text-white">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500">
                  <MessageCircle className="h-4.5 w-4.5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm tracking-tight">Mixnosh Assistant</span>
                    {apiKey && (
                      <span className="flex items-center gap-0.5 rounded bg-orange-500/20 px-1 py-0.5 text-[9px] font-black uppercase text-orange-400">
                        <Sparkles className="h-2 w-2" /> Live
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-400 font-medium">Online &amp; ready</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-zinc-800 hover:text-white transition-colors"
                  title="Configure Gemini API Key"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={toggleChat}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Body & Settings Panels */}
            <div className="relative flex-1 overflow-hidden bg-[#fafafa]">
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-x-0 top-0 z-20 bg-white border-b border-neutral-100 p-4 shadow-lg"
                  >
                    <form onSubmit={handleSaveKey} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                          <Key className="h-3.5 w-3.5 text-orange-500" />
                          Gemini API Configuration
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowSettings(false)}
                          className="text-[10px] font-bold text-neutral-400 hover:text-neutral-600"
                        >
                          Cancel
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-500 leading-normal">
                        To enable live conversational intelligence, paste your Gemini API Key. Keys are saved securely in your browser's local storage.
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="password"
                          placeholder="AIzaSy..."
                          value={tempApiKey}
                          onChange={(e) => setTempApiKey(e.target.value)}
                          className="flex-1 rounded-xl border border-neutral-200 px-3 py-2 text-xs outline-none focus:border-orange-500 bg-neutral-50"
                        />
                        <button
                          type="submit"
                          className="rounded-xl bg-orange-500 px-3 text-xs font-bold text-white hover:bg-orange-600 transition-colors flex items-center gap-1 shrink-0"
                        >
                          {keySaved ? <CheckCircle2 className="h-3.5 w-3.5" /> : "Save"}
                        </button>
                      </div>
                      {apiKey && (
                        <div className="flex items-center justify-between text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                          <span>✓ Active API Key configured</span>
                          <button
                            type="button"
                            onClick={() => {
                              setTempApiKey('');
                              setApiKey('');
                              localStorage.removeItem('gemini_api_key');
                            }}
                            className="font-bold underline text-neutral-500 hover:text-red-500"
                          >
                            Clear
                          </button>
                        </div>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message scroll list */}
              <div className="h-full overflow-y-auto p-4 pb-20">
                <div className="flex flex-col gap-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-wrap ${
                        msg.type === 'bot'
                          ? 'self-start rounded-tl-none border border-neutral-200/60 bg-white text-neutral-800 shadow-sm'
                          : 'self-end rounded-tr-none bg-zinc-900 text-white shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="self-start rounded-2xl rounded-tl-none border border-neutral-200/60 bg-white p-3 text-xs text-neutral-400 shadow-sm flex items-center gap-1.5">
                      <RefreshCw className="h-3 w-3 animate-spin text-orange-500" />
                      <span>Thinking...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Action pills (only visible when chat starts/is fresh) */}
                {messages.length <= 2 && !isLoading && (
                  <div className="mt-5 flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider mb-1">Suggested topics</span>
                    {['Book a Table', 'Workshop Info', 'Menu & Pricing', 'Visit Us'].map((action) => (
                      <button
                        key={action}
                        onClick={() => handleQuickAction(action)}
                        className="rounded-xl border border-orange-100 bg-orange-50/50 px-3.5 py-2 text-left text-xs font-bold text-orange-800 transition-all hover:bg-orange-100/70 hover:border-orange-200 cursor-pointer"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Input Bar */}
            <div className="border-t border-neutral-100 bg-white p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={apiKey ? "Ask Mixnosh AI anything..." : "Ask offline or add Gemini Key..."}
                  className="flex-1 bg-transparent text-xs outline-none placeholder:text-neutral-400 text-neutral-800"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="text-orange-500 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
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
