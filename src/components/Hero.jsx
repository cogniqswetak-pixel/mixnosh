import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame, AnimatePresence } from "framer-motion";
import { ArrowDown, Sparkles, Utensils, Palette } from "lucide-react";

/* ── Rotating circular text badge ── */
function RotatingBadge({ label = "Book Now · Explore Now · ", onClick }) {
  const ringRef = useRef(null);
  useAnimationFrame((t) => {
    if (ringRef.current) {
      ringRef.current.style.transform = `rotate(${t * 0.025}deg)`;
    }
  });
  const chars = label.split("");
  const total = chars.length;
  const radius = 40;

  return (
    <button
      onClick={onClick}
      className="relative w-32 h-32 flex items-center justify-center cursor-pointer group"
      aria-label="Book Now"
    >
      <svg
        ref={ringRef}
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
      >
        {chars.map((ch, i) => {
          const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          const rot = (i / total) * 360;
          return (
            <text
              key={i}
              x={x}
              y={y}
              fontSize="7.5"
              fontWeight="800"
              fill="#ffffff"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${rot},${x},${y})`}
            >
              {ch}
            </text>
          );
        })}
      </svg>
      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 group-hover:bg-orange-500 transition-colors duration-300 flex items-center justify-center z-10 shadow-xl">
        <ArrowDown className="w-6 h-6 text-white" />
      </div>
    </button>
  );
}

const FEATURED_CARDS = [
  {
    badge: "Workshops",
    badgeBg: "bg-orange-500 text-white",
    title: "Hands-on Art Events",
    img: "https://admin.mixnosh.in/creativeself/Art & Events Collage.png",
    objectPosition: "object-center",
  },
  {
    badge: "Art Atmosphere",
    badgeBg: "bg-amber-400 text-neutral-900",
    title: "Bengaluru's Premier Art Cafe",
    img: "https://admin.mixnosh.in/slider/IMG-20250413-WA0019.jpg",
    objectPosition: "object-top",
  },
  {
    badge: "Menu & Dining",
    badgeBg: "bg-orange-500 text-white",
    title: "Delicious Food & Brews",
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=80",
    objectPosition: "object-center",
  },
];

/* ── 3D Pop-up Cover Flow Carousel Component ── */
function CoverFlowCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_CARDS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto pt-4 pb-2 px-2">
      {/* Mobile View — Clean single active card */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="group relative rounded-3xl overflow-hidden shadow-2xl h-72 border-4 border-orange-400 cursor-pointer"
          >
            <img
              src={FEATURED_CARDS[activeIndex].img}
              alt={FEATURED_CARDS[activeIndex].title}
              className={`w-full h-full object-cover ${FEATURED_CARDS[activeIndex].objectPosition}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-left">
              <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${FEATURED_CARDS[activeIndex].badgeBg}`}>
                {FEATURED_CARDS[activeIndex].badge}
              </span>
              <h4 className="text-white text-lg font-black uppercase tracking-tight mt-2">
                {FEATURED_CARDS[activeIndex].title}
              </h4>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop View — 3D Coverflow Grid */}
      <div className="hidden md:grid grid-cols-3 gap-6 items-center">
        {FEATURED_CARDS.map((card, i) => {
          const isCenter = i === activeIndex;
          return (
            <motion.div
              key={i}
              onClick={() => setActiveIndex(i)}
              animate={{
                scale: isCenter ? 1.08 : 0.88,
                y: isCenter ? -14 : 12,
                opacity: isCenter ? 1 : 0.72,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative rounded-3xl overflow-hidden shadow-2xl h-80 md:h-96 border-4 transition-all duration-500 cursor-pointer ${
                isCenter
                  ? "border-orange-400 ring-4 ring-orange-500/25 z-20 shadow-orange-500/20"
                  : "border-white z-10 hover:opacity-95"
              }`}
            >
              <img
                src={card.img}
                alt={card.title}
                className={`w-full h-full object-cover ${card.objectPosition} transition-transform duration-700 ${
                  isCenter ? "group-hover:scale-105" : ""
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span
                  className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${card.badgeBg}`}
                >
                  {card.badge}
                </span>
                <h4 className="text-white text-base sm:text-xl font-black uppercase tracking-tight mt-2">
                  {card.title}
                </h4>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Indicators */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {FEATURED_CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === i
                ? "w-8 bg-orange-500 shadow-md shadow-orange-500/40"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero({ onOpenBooking, onViewWorkshops }) {
  return (
    <section className="relative overflow-hidden text-neutral-900 min-h-screen flex flex-col justify-center select-none pt-24 sm:pt-28 pb-16">
      {/* ── HERO BACKGROUND PHOTO ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Mixnosh Cafe"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* INFINITE ANIMATED MIXNOSH BACKGROUND MARQUEE */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 overflow-hidden py-10 opacity-[0.12] select-none flex whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
            className="flex items-center gap-12 text-[22vw] sm:text-[18vw] lg:text-[15vw] font-heading font-black tracking-tighter uppercase leading-none text-white"
          >
            <span>MIXNOSH</span>
            <span className="text-orange-500">•</span>
            <span>ART CAFE</span>
            <span className="text-amber-500">•</span>
            <span>SNEAKER &amp; RESIN</span>
            <span className="text-orange-500">•</span>
            <span>MIXNOSH</span>
            <span className="text-orange-500">•</span>
            <span>ART CAFE</span>
            <span className="text-amber-500">•</span>
            <span>SNEAKER &amp; RESIN</span>
            <span className="text-orange-500">•</span>
          </motion.div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
        {/* ── HEADLINE + FLOATING CARDS ROW ── */}
        <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center">

          {/* LEFT Floating Sneaker Art Card */}
          <motion.div
            initial={{ x: -180, opacity: 0, rotate: -7 }}
            animate={[
              { x: 0, opacity: 1, rotate: -7, transition: { duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] } },
            ]}
            className="absolute -left-6 lg:-left-16 xl:-left-28 top-1/2 -translate-y-[58%] z-20 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -16, 0], rotate: [-7, -5, -7] }}
              transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 1.2 }}
            >
              <div className="relative w-72 lg:w-80 xl:w-88 rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(249,115,22,0.3)] border-4 border-white group bg-white">
                <img
                  src="https://admin.mixnosh.in/sneakerandresinart/IMG-20250318-WA0032.jpg"
                  alt="Sneaker Art Customization"
                  className="w-full h-64 lg:h-72 xl:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <span className="absolute top-4 left-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-r-full shadow-lg">
                  🎨 Sneaker Art
                </span>
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white text-base font-black uppercase tracking-wider">
                    Custom Kicks Workshop
                  </p>
                  <p className="text-orange-200 text-xs font-bold mt-0.5">
                    Powered by Cheeky Sneeky
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT Floating Resin Art Card */}
          <motion.div
            initial={{ x: 180, opacity: 0, rotate: 7 }}
            animate={[
              { x: 0, opacity: 1, rotate: 7, transition: { duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] } },
            ]}
            className="absolute -right-6 lg:-right-16 xl:-right-28 top-1/2 -translate-y-[58%] z-20 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, 16, 0], rotate: [7, 5, 7] }}
              transition={{ repeat: Infinity, duration: 5.6, ease: "easeInOut", delay: 1.4 }}
            >
              <div className="relative w-72 lg:w-80 xl:w-88 rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(249,115,22,0.3)] border-4 border-white group bg-white">
                <img
                  src="https://admin.mixnosh.in/sneakerandresinart/Untitled-5.jpg"
                  alt="Resin Art Workshop"
                  className="w-full h-64 lg:h-72 xl:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <span className="absolute top-4 right-0 bg-amber-400 text-neutral-950 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-l-full shadow-lg">
                  ✨ Resin Art
                </span>
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white text-base font-black uppercase tracking-wider">
                    Epoxy Resin Decor
                  </p>
                  <p className="text-amber-300 text-xs font-bold mt-0.5">
                    In Collaboration with Kunstwork
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── CENTRE HEADLINE ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-center px-4 lg:px-48 xl:px-56 relative z-10"
          >
            {/* Tagline Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-orange-200/90 shadow-sm text-orange-600 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              India's First Sneaker &amp; Resin Art Cafe
            </span>

            {/* Headline */}
            <h1 className="font-heading leading-[1.06] tracking-tight">
              <span className="block font-normal text-3xl sm:text-5xl lg:text-6xl text-white/90">
                Where Food Meets
              </span>
              <span className="block font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white my-0.5">
                Creative Art
              </span>
              <span className="block font-normal text-3xl sm:text-5xl lg:text-6xl text-white/90">
                &amp;{" "}
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300">
                  Dining Cafe
                </span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-white/85 text-xs sm:text-base lg:text-lg font-medium mt-4 sm:mt-6 max-w-lg mx-auto leading-relaxed px-2">
              Indulge in delicious food, craft custom painted sneakers, and pour epoxy resin art — all in Bengaluru's most vibrant art café.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 mt-7 sm:mt-8 w-full max-w-xs sm:max-w-none mx-auto">
              <button
                onClick={() => onOpenBooking("workshop")}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-heading font-black text-xs sm:text-sm uppercase tracking-widest hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:scale-105 shadow-xl shadow-orange-500/25 cursor-pointer flex items-center justify-center gap-2.5 active:scale-95"
              >
                <Palette className="w-4 h-4 text-amber-100" />
                Book Experience
              </button>
              <button
                onClick={() => onOpenBooking("table")}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border-2 border-white/70 bg-white/15 backdrop-blur-sm text-white font-heading font-black text-xs sm:text-sm uppercase tracking-widest hover:border-white hover:bg-white/25 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 shadow-sm active:scale-95"
              >
                <Utensils className="w-4 h-4 text-orange-300" />
                Reserve Table
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── ROTATING SCROLL BADGE ── */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mt-14 sm:mt-16"
        >
          <RotatingBadge
            label="Explore Now · Book Now · "
            onClick={() => {
              document.getElementById("dine")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </motion.div>

        {/* ── 3D POP-UP COVER FLOW CAROUSEL ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-14 w-full max-w-5xl mx-auto"
        >
          <CoverFlowCarousel />
        </motion.div>

      </div>
    </section>
  );
}
