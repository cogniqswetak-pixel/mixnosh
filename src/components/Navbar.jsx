import React, { useState } from "react";
import { Menu, X, Sparkles, ChevronRight, ArrowUpRight, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({
  onOpenBooking,
  currentView,
  setCurrentView,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [activeLink, setActiveLink] = useState(
    currentView === "home" ? "dine" : currentView
  );

  const navItems = [
    { id: "dine", label: "Dine & Unwind", view: "home", target: "dine" },
    { id: "arts", label: "Art & Events", view: "home", target: "arts" },
    {
      id: "customresinsneakers",
      label: "Custom Sneaker & Resin",
      view: "home",
      target: "customresinsneakers",
      badge: "Popular",
    },
    { id: "workshops", label: "Cafe Programs", view: "home", target: "workshops" },
    { id: "bookclub", label: "Book Club", view: "home", target: "bookclub" },
  ];

  const handleNavClick = (view, elementId, tabId) => {
    setCurrentView(view);
    setActiveLink(tabId || elementId || view);
    setMobileMenuOpen(false);
    if (view === "home" && elementId) {
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent">
      {/* Sleek Floating Navbar Container */}
      <div className="px-3 sm:px-6 py-2 sm:py-2.5 max-w-7xl mx-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white/90 backdrop-blur-2xl border-2 border-white/90 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] ring-1 ring-orange-500/10"
        >
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Logo */}
            <motion.button
              whileHover={{ scale: 1.04, rotate: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleNavClick("home", "dine", "dine")}
              className="cursor-pointer flex items-center focus:outline-none relative group px-2 py-1 mr-2 lg:mr-4"
              aria-label="Mixnosh Home"
            >
              <img
                src="https://mixnosh.in/newmix/assets/img/logo.svg"
                alt="Mixnosh Art Cafe Logo"
                className="h-9 sm:h-11.5 w-auto object-contain transition-all duration-300 relative z-10"
              />
            </motion.button>

            {/* Desktop Nav Links */}
            <div
              className="hidden lg:flex items-center gap-1 bg-neutral-100/90 p-1.5 rounded-full border border-neutral-200/80 shadow-inner relative"
              onMouseLeave={() => setHoveredTab(null)}
            >
              {navItems.map((item) => {
                const isActive = activeLink === item.id;
                const isHovered = hoveredTab === item.id;

                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ y: -1, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleNavClick(item.view, item.target, item.id)}
                    onMouseEnter={() => setHoveredTab(item.id)}
                    className={`relative px-3.5 sm:px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer z-10 select-none flex items-center gap-1.5 ${
                      isActive
                        ? "text-white"
                        : "text-neutral-700 hover:text-neutral-950"
                    }`}
                  >
                    {/* Active Indicator Glow Ring */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-[0_3px_16px_rgba(249,115,22,0.35)] z-[-1]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Hover Highlight Pill */}
                    {isHovered && !isActive && (
                      <motion.div
                        layoutId="hoverNavPill"
                        className="absolute inset-0 bg-orange-500/10 rounded-full z-[-1]"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}

                    {/* Label & Optional Badge */}
                    <span>{item.label}</span>

                    {item.badge && (
                      <span className="text-[8.5px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold shadow-sm animate-pulse">
                        {item.badge}
                      </span>
                    )}

                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick("home", "locations", "locations")}
                className="group px-3.5 py-2 text-xs font-extrabold text-neutral-800 hover:text-orange-600 uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Visit Now</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onOpenBooking("workshop")}
                className="relative px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(249,115,22,0.35)] hover:shadow-[0_8px_28px_rgba(249,115,22,0.5)] transition-all overflow-hidden border border-amber-300/40"
              >
                {/* Shimmer Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
                <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" style={{ animationDuration: "6s" }} />
                <span>Book Experience</span>
              </motion.button>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => onOpenBooking("workshop")}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-orange-500/25"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" /> Book
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full text-neutral-900 bg-neutral-100 hover:bg-orange-100 transition-colors focus:outline-none border border-neutral-200 shadow-sm"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-orange-600" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Animated Mobile Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden mt-3 pt-3 border-t-2 border-orange-100 flex flex-col gap-2 overflow-hidden"
              >
                <div className="flex flex-col gap-2 pt-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleNavClick(item.view, item.target, item.id)}
                      className={`w-full px-4 py-3.5 rounded-2xl text-left font-black text-xs uppercase tracking-wider flex items-center justify-between transition-all ${
                        activeLink === item.id
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25"
                          : "bg-neutral-50 text-neutral-800 border border-neutral-200/60"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.badge && (
                          <span className="text-[8.5px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 ${
                          activeLink === item.id ? "text-white" : "text-orange-400"
                        }`}
                      />
                    </motion.button>
                  ))}

                  <motion.button
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleNavClick("home", "locations", "locations")}
                    className="w-full px-4 py-3.5 rounded-2xl text-left font-black text-xs uppercase tracking-wider bg-neutral-50 text-neutral-800 flex items-center justify-between transition-all border border-neutral-200/60"
                  >
                    <span>📍 Visit Now</span>
                    <ArrowUpRight className="w-4 h-4 text-orange-500" />
                  </motion.button>
                </div>

                <div className="pt-2 pb-2 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBooking("table");
                    }}
                    className="py-4 font-black text-sm uppercase border-2 border-orange-500 text-orange-600 rounded-2xl hover:bg-orange-50 transition-all text-center tracking-wider"
                  >
                    Reserve a Table
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBooking("workshop");
                    }}
                    className="py-4 font-black text-sm uppercase bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white rounded-2xl shadow-lg shadow-orange-500/25 text-center tracking-wider"
                  >
                    ✨ Book Workshop Experience
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </header>
  );
}




