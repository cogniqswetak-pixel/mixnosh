import React, { useState } from "react";
import {
  Palette,
  UtensilsCrossed,
  Users,
  Sparkles,
  Coffee,
  Heart,
  ArrowRight,
  CheckCircle2,
  X,
  Star,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PILLARS = [
  {
    id: "art",
    title: "Sneaker & Resin Art",
    subtitle: "India's First Sneaker & Resin Art Cafe",
    badge: "100% Beginner Friendly",
    tagline: "Unleash your inner artist with step-by-step guidance from pros.",
    img: "https://admin.mixnosh.in/sneakerandresinart/IMG-20250318-WA0032.jpg",
    color: "from-orange-500 to-amber-500",
    bgAccent: "bg-orange-50 text-orange-600 border-orange-200",
    icon: Palette,
    highlights: [
      "Custom Sneaker Painting with waterproof leather acrylics",
      "Epoxy Resin Ocean Trays, Clocks & Coasters",
      "Tote Bag & Canvas Painting Sessions",
      "All art materials, protective gear & aprons included",
    ],
  },
  {
    id: "food",
    title: "Flavors That Inspire",
    subtitle: "Artisanal Dining & Specialty Brews",
    badge: "Fresh Artisan Menu",
    tagline: "Savor gourmet Italian, comfort bites, and handcrafted cold brews.",
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=80",
    color: "from-amber-500 to-orange-500",
    bgAccent: "bg-amber-50 text-amber-600 border-amber-200",
    icon: UtensilsCrossed,
    highlights: [
      "Signature Creamy Blush Pastas & Garlic Bread",
      "Cold Brew Coffee & Refreshing Iced Teas",
      "Gooey Marshmallow Walnut Brownies",
      "Handcrafted Mocktails & Fruit Infusions",
    ],
  },
  {
    id: "events",
    title: "Events & Book Club",
    subtitle: "Bengaluru's Premier Social Hub",
    badge: "Community Vibes",
    tagline: "Celebrate birthdays, corporate offsites, and silent book readings.",
    img: "https://admin.mixnosh.in/creativeself/Art & Events Collage.png",
    color: "from-orange-600 to-amber-500",
    bgAccent: "bg-orange-50 text-orange-600 border-orange-200",
    icon: Users,
    highlights: [
      "Private Birthday & Anniversary Celebrations",
      "Corporate Team-Building Art Offsites",
      "Weekend Silent Book Club Sessions",
      "Creative Writing & Acoustic Music Evenings",
    ],
  },
];

export default function AboutSection({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeModal, setActiveModal] = useState(null);

  const activePillar = PILLARS[activeTab];

  return (
    <section
      id="arts"
      className="py-16 lg:py-24 relative overflow-hidden bg-[#faf8f5] border-t border-b border-orange-200/50 select-none"
    >
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 space-y-16">
        
        {/* ── HEADER BADGE + TITLE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100/90 border border-orange-200 text-orange-600 rounded-full font-black text-xs uppercase tracking-widest shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Discover Mixnosh
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 tracking-tighter uppercase leading-none">
            BENGALURU'S ULTIMATE HUB FOR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
              ART &amp; DINING
            </span>
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
            Mixnosh combines delicious food with hands-on creative experiences.
            Whether you want to customize sneakers, pour epoxy resin, paint tote
            bags, or read a book with artisan coffee — we welcome everyone to
            paint, taste, and relax.
          </p>
        </motion.div>

        {/* ── INTERACTIVE SPLIT SHOWCASE (LEFT: TABS, RIGHT: FEATURE PREVIEW) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/90 border-2 border-orange-100 rounded-[36px] p-6 sm:p-10 shadow-xl shadow-orange-500/5">
          
          {/* LEFT: INTERACTIVE TABS */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">
              Explore Our Pillars
            </p>

            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activeTab === idx;

              return (
                <motion.button
                  key={pillar.id}
                  onClick={() => setActiveTab(idx)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-lg shadow-orange-500/25 scale-[1.02]"
                      : "bg-white/80 border-orange-100 text-neutral-900 hover:border-orange-300 hover:bg-orange-50/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-orange-100/80 text-orange-600 group-hover:bg-orange-500 group-hover:text-white"
                      } transition-colors`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3
                        className={`font-heading font-black text-base sm:text-lg uppercase tracking-tight ${
                          isActive ? "text-white" : "text-neutral-900"
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      <p
                        className={`text-xs font-medium line-clamp-1 mt-0.5 ${
                          isActive ? "text-orange-100" : "text-neutral-500"
                        }`}
                      >
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      isActive ? "text-white translate-x-1" : "text-neutral-400 group-hover:text-orange-500"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT: DYNAMIC FEATURE DISPLAY CARD */}
          <div className="lg:col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-neutral-900 h-[420px] sm:h-[460px] flex flex-col justify-end group"
              >
                {/* Background Image */}
                <img
                  src={activePillar.img}
                  alt={activePillar.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                {/* Floating Top Badge */}
                <span className="absolute top-5 left-5 px-4 py-1.5 rounded-full bg-white/95 text-neutral-900 text-xs font-black uppercase tracking-wider shadow-md backdrop-blur-md">
                  ✨ {activePillar.badge}
                </span>

                {/* Card Content Overlay */}
                <div className="relative z-10 p-6 sm:p-8 space-y-4">
                  <div>
                    <h3 className="text-white font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight">
                      {activePillar.title}
                    </h3>
                    <p className="text-orange-300 text-xs sm:text-sm font-bold mt-1">
                      {activePillar.tagline}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {activePillar.highlights.slice(0, 4).map((point, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10"
                      >
                        <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                        <span className="text-white text-xs font-semibold line-clamp-1">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <button
                      onClick={() => setActiveModal(activePillar)}
                      className="px-6 py-3 rounded-full bg-white text-neutral-950 font-heading font-black text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all cursor-pointer shadow-lg flex items-center gap-2"
                    >
                      Explore Full Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (onOpenBooking) onOpenBooking("workshop");
                      }}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-heading font-black text-xs uppercase tracking-widest hover:from-orange-600 hover:to-amber-600 transition-all cursor-pointer shadow-lg shadow-orange-500/30"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        

        {/* ── SLEEK STATS BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white border-2 border-orange-200/90 rounded-3xl p-8 sm:p-10 shadow-xl shadow-orange-500/5 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-2 border-r border-orange-100 last:border-0">
              <div className="flex items-center justify-center gap-1.5 text-neutral-900 font-heading font-black text-4xl sm:text-5xl">
                <span>4.8</span>
                <Star className="w-7 h-7 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-orange-600 text-xs font-black uppercase tracking-wider block mt-2">
                Google Rating
              </span>
            </div>

            <div className="p-2 border-r border-orange-100 last:border-0">
              <div className="flex items-center justify-center gap-1 text-neutral-900 font-heading font-black text-4xl sm:text-5xl">
                <span>2</span>
                <MapPin className="w-6 h-6 text-orange-500" />
              </div>
              <span className="text-amber-600 text-xs font-black uppercase tracking-wider block mt-2">
                HSR &amp; Jayanagar
              </span>
            </div>

            <div className="p-2 border-r border-orange-100 last:border-0">
              <span className="font-heading font-black text-4xl sm:text-5xl text-neutral-900 block mb-1">
                10k+
              </span>
              <span className="text-orange-600 text-xs font-black uppercase tracking-wider block mt-2">
                Artworks Created
              </span>
            </div>

            <div className="p-2">
              <span className="font-heading font-black text-4xl sm:text-5xl text-neutral-900 block mb-1">
                100%
              </span>
              <span className="text-amber-600 text-xs font-black uppercase tracking-wider block mt-2">
                Beginner Friendly
              </span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── INTERACTIVE DETAIL MODAL ── */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-[110] bg-neutral-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border-4 border-orange-100 relative"
            >
              {/* Header Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={activeModal.img}
                  alt={activeModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors cursor-pointer shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-5 left-6 right-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-orange-500 text-white shadow-md">
                    ✨ {activeModal.badge}
                  </span>
                  <h3 className="text-white font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight mt-2">
                    {activeModal.title}
                  </h3>
                  <p className="text-orange-200 text-xs font-bold mt-0.5">
                    {activeModal.subtitle}
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-medium">
                  {activeModal.desc}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-neutral-500">
                    What You'll Experience:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModal.highlights.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 bg-orange-50/80 p-3 rounded-xl border border-orange-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <span className="text-neutral-800 text-xs font-bold">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-end gap-3">
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      if (onOpenBooking) onOpenBooking("workshop");
                    }}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-heading font-black text-xs uppercase tracking-widest hover:from-orange-600 hover:to-amber-600 transition-all cursor-pointer shadow-lg shadow-orange-500/20"
                  >
                    Book Experience Now
                  </button>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-6 py-3 rounded-full border border-neutral-300 text-neutral-700 font-bold text-xs uppercase tracking-widest hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
