import React, { useState } from "react";
import { X, MapPin, Clock, ExternalLink, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BRANCHES = {
  hsr: {
    label: "HSR Bengaluru",
    address: "1919, 21st Main Road, 25th Cross, Sector 2, HSR, Bengaluru",
    phone: ["+91 6364330840", "+91 6364330860"],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4613.1277319825585!2d77.6455974!3d12.9075026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae153ecf931725%3A0xa36043b5fd3d2c2d!2sMixNosh%20%7C%20Art%20Cafe!5e1!3m2!1sen!2sin!4v1763178308872!5m2!1sen!2sin",
    mapLink: "https://maps.app.goo.gl/EEipkRWcMnYhQdU17",
    hours: [
      { day: "Sunday", time: "10 am – 10:30 pm" },
      { day: "Monday", time: "10 am – 10:30 pm" },
      { day: "Tuesday", time: "10 am – 10:30 pm" },
      { day: "Wednesday", time: "10 am – 10:30 pm" },
      { day: "Thursday", time: "10 am – 10:30 pm" },
      { day: "Friday", time: "10 am – 10:30 pm" },
      { day: "Saturday", time: "10 am – 10:30 pm" },
    ],
    menuImages: [
      "https://admin.mixnosh.in/menus/HSR_Menu_page-0004.jpg",
      "https://admin.mixnosh.in/menus/HSR_Menu_page-0003.jpg",
      "https://admin.mixnosh.in/menus/HSR_Menu_page-0002.jpg",
      "https://admin.mixnosh.in/menus/HSR_Menu_page-0001.jpg",
    ],
    menuLink: "https://mixnosh.in/hsr-menu.php",
  },
  jayanagar: {
    label: "Jayanagar Bengaluru",
    address:
      "Ground Floor, 13th Cross, 732, 36th Cross Rd, 7th Block, Jayanagar, Bengaluru, Karnataka 560070",
    phone: ["+91 9900018115"],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4612.8284363070725!2d77.57165977572262!3d12.923713415925024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1533b3b45535%3A0x2f2dbff1cc70586e!2sMixnosh%20%7C%20Art%20Cafe%2C%20Jayanagar!5e1!3m2!1sen!2sin!4v1763178381761!5m2!1sen!2sin",
    mapLink: "https://maps.app.goo.gl/NMUYGs17JYg1qfzv9",
    hours: [
      { day: "Sunday", time: "10:30 am – 11 pm" },
      { day: "Monday", time: "10:30 am – 10 pm" },
      { day: "Tuesday", time: "10:30 am – 10 pm" },
      { day: "Wednesday", time: "10:30 am – 10 pm" },
      { day: "Thursday", time: "10:30 am – 10 pm" },
      { day: "Friday", time: "10:30 am – 11 pm" },
      { day: "Saturday", time: "10:30 am – 11 pm" },
    ],
    menuImages: [
      "https://admin.mixnosh.in/jayanagar/1.jpg",
      "https://admin.mixnosh.in/jayanagar/2.jpg",
      "https://admin.mixnosh.in/jayanagar/3.jpg",
      "https://admin.mixnosh.in/jayanagar/4.jpg",
      "https://admin.mixnosh.in/jayanagar/5.jpg",
      "https://admin.mixnosh.in/jayanagar/6.jpg",
      "https://admin.mixnosh.in/jayanagar/7.jpg",
      "https://admin.mixnosh.in/jayanagar/8.jpg",
    ],
    menuLink: "https://mixnosh.in/jaynagar-menu.php",
  },
};

export default function MenuModal({ isOpen, onClose, onOpenBooking }) {
  const [activeBranch, setActiveBranch] = useState("hsr");
  const [view, setView] = useState("info"); // "info" | "menu"

  if (!isOpen) return null;

  const branch = BRANCHES[activeBranch];

  const handleClose = () => {
    setView("info");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-neutral-950/70 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-orange-200/60 overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 text-white shrink-0">
              <div className="flex items-center gap-3">
                <UtensilsCrossed className="w-5 h-5 text-white/80" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/70">
                    Mixnosh Art Cafe
                  </p>
                  <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight leading-none">
                    {view === "info" ? "Location & Menu" : "Our Menu"}
                  </h3>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-white/20 hover:bg-white hover:text-neutral-900 text-white transition-all cursor-pointer backdrop-blur-md"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ── Branch Tabs ── */}
            <div className="flex items-center gap-1 px-6 pt-4 pb-0 bg-orange-50 border-b border-orange-200/60 shrink-0">
              {Object.entries(BRANCHES).map(([key, b]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveBranch(key);
                    setView("info");
                  }}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-t-xl text-xs font-extrabold uppercase tracking-wide transition-all cursor-pointer border-b-2 -mb-px ${
                    activeBranch === key
                      ? "bg-white text-orange-600 border-orange-500 shadow-sm"
                      : "text-neutral-500 border-transparent hover:text-neutral-800 hover:bg-white/60"
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  {b.label}
                </button>
              ))}

              {/* View toggle pills — right-aligned */}
              <div className="ml-auto flex items-center gap-1 pb-2">
                <button
                  onClick={() => setView("info")}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold uppercase transition-all cursor-pointer ${
                    view === "info"
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Info & Map
                </button>
                <button
                  onClick={() => setView("menu")}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold uppercase transition-all cursor-pointer ${
                    view === "menu"
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  View Menu
                </button>
              </div>
            </div>

            {/* ── Content Body ── */}
            <div className="overflow-y-auto flex-grow">
              <AnimatePresence mode="wait">
                {view === "info" ? (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {/* Google Maps */}
                    <div className="rounded-2xl overflow-hidden border border-orange-200/80 shadow-md aspect-video md:aspect-auto md:h-72">
                      <iframe
                        src={branch.mapSrc}
                        className="w-full h-full"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${branch.label} Map`}
                      />
                    </div>

                    {/* Info Column */}
                    <div className="space-y-5">
                      {/* Address */}
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                          <MapPin className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-1">
                            Address
                          </p>
                          <a
                            href={branch.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-neutral-800 hover:text-orange-600 transition-colors leading-relaxed flex items-start gap-1"
                          >
                            {branch.address}
                            <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 text-orange-400" />
                          </a>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {branch.phone.map((p) => (
                              <a
                                key={p}
                                href={`tel:${p}`}
                                className="text-xs font-bold text-orange-600 hover:underline"
                              >
                                {p}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Opening Hours */}
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                            Opening Hours
                          </p>
                          <ul className="space-y-1">
                            {branch.hours.map(({ day, time }) => (
                              <li
                                key={day}
                                className="flex items-center justify-between text-xs font-medium text-neutral-700"
                              >
                                <span className="text-neutral-500 w-24">{day}</span>
                                <span className="font-bold text-neutral-900">{time}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA: Explore Menu */}
                      <button
                        onClick={() => setView("menu")}
                        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <UtensilsCrossed className="w-4 h-4 text-amber-200" />
                        Explore {branch.label.split(" ")[0]} Menu
                      </button>

                      {/* Reserve Table */}
                      <button
                        onClick={() => {
                          handleClose();
                          onOpenBooking("table");
                        }}
                        className="w-full py-3 px-6 rounded-2xl border-2 border-orange-400 bg-white text-orange-600 hover:bg-orange-50 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Reserve Table Now
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 sm:p-6 space-y-4"
                  >
                    {/* Menu Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-heading font-black text-lg text-neutral-900 uppercase">
                          {branch.label} Menu
                        </h4>
                        <p className="text-xs text-neutral-500 font-medium">
                          Scroll to browse all pages
                        </p>
                      </div>
                      <a
                        href={branch.menuLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 text-xs font-extrabold uppercase tracking-wider hover:bg-orange-100 transition-all"
                      >
                        Open Full Menu <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Menu Images */}
                    <div className="space-y-3">
                      {branch.menuImages.map((src, i) => (
                        <div
                          key={i}
                          className="rounded-2xl overflow-hidden border border-orange-200/80 shadow-sm"
                        >
                          <img
                            src={src}
                            alt={`${branch.label} Menu Page ${branch.menuImages.length - i}`}
                            className="w-full h-auto object-contain"
                            loading={i === 0 ? "eager" : "lazy"}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Bottom CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-2">
                      <button
                        onClick={() => {
                          handleClose();
                          onOpenBooking("table");
                        }}
                        className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Reserve Table
                      </button>
                      <a
                        href={
                          activeBranch === "hsr"
                            ? "https://www.swiggy.com/city/bangalore/mixnosh-indias-first-sneaker-and-resin-art-cafe-sector-2-hsr-rest921314"
                            : "https://zomato.onelink.me/xqzv/fopfn48a"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3.5 px-6 rounded-2xl border-2 border-orange-400 bg-white text-orange-600 font-bold text-sm uppercase tracking-wider hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
                      >
                        Order Online <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
