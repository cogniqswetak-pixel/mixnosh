import React from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const MOMENTS = [
  {
    img: "https://admin.mixnosh.in/artfulmoments/IMG-20250318-WA0034.jpg",
    label: "Resin Creations 🎨",
    rotate: -3,
    color: "bg-amber-100",
    border: "border-amber-300",
  },
  {
    img: "https://admin.mixnosh.in/artfulmoments/resin-art-workshop-bangalore.jpg",
    label: "Workshop Vibes ✨",
    rotate: 2,
    color: "bg-orange-100",
    border: "border-orange-300",
  },
  {
    img: "https://admin.mixnosh.in/artfulmoments/banner-img-3.jpg",
    label: "Custom Sneakers 👟",
    rotate: -2,
    color: "bg-yellow-100",
    border: "border-yellow-300",
  },
  {
    img: "https://admin.mixnosh.in/artfulmoments/resin-art-workshop-bangalore-1.jpg",
    label: "Art Moments 🖌️",
    rotate: 3,
    color: "bg-pink-100",
    border: "border-pink-300",
  },
  {
    img: "https://admin.mixnosh.in/artfulmoments/WhatsApp Image 2025-04-15 at 22.37.11_71c29c9c.jpg",
    label: "Cafe Sessions ☕",
    rotate: -1,
    color: "bg-lime-100",
    border: "border-lime-300",
  },
  {
    img: "https://admin.mixnosh.in/artfulmoments/IMG-20250318-WA0026.jpg",
    label: "Happy Artists 😊",
    rotate: 2,
    color: "bg-sky-100",
    border: "border-sky-300",
  },
  {
    img: "https://admin.mixnosh.in/artfulmoments/WhatsApp Image 2025-03-31 at 11.41.05_36a27bab.jpg",
    label: "Creative Space 🌟",
    rotate: -2,
    color: "bg-violet-100",
    border: "border-violet-300",
  },
];

export default function ArtfulMoments() {
  const scrollingMoments = [...MOMENTS, ...MOMENTS, ...MOMENTS];

  return (
    <section className="pt-4 pb-16 lg:pt-8 lg:pb-24 relative overflow-hidden bg-transparent">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold uppercase tracking-[0.2em] mb-4"
        >
          <Camera className="w-3.5 h-3.5 text-amber-500" />
          Our Gallery
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading font-black text-neutral-900 text-4xl sm:text-5xl md:text-6xl tracking-tighter mb-4 relative uppercase"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
            Artful
          </span>{" "}
          Moments
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-neutral-600 text-base md:text-lg font-medium max-w-xl leading-relaxed"
        >
          Explore our vibrant collection of snapshots! Every corner of Mixnosh
          is designed to inspire your inner artist.
        </motion.p>
      </div>

      {/* Sticky Note Marquee */}
      <div className="relative w-full overflow-hidden py-8">
        {/* Row 1 — scrolls left */}
        <div className="flex w-max animate-marquee gap-4 sm:gap-6 mb-4 sm:mb-6">
          {scrollingMoments.map((item, i) => (
            <div
              key={`a-${i}`}
              className={`relative shrink-0 w-48 sm:w-64 ${item.color} ${item.border} border-2 rounded-2xl p-2.5 sm:p-3 shadow-[4px_6px_18px_rgba(0,0,0,0.12)] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[6px_10px_28px_rgba(0,0,0,0.18)]`}
              style={{ transform: `rotate(${item.rotate}deg)` }}
            >
              {/* Tape strip top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 bg-white/70 border border-white/80 rounded-sm shadow-sm z-10 backdrop-blur-sm" />

              {/* Photo */}
              <div className="rounded-xl overflow-hidden aspect-[4/3] shadow-inner">
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>

              {/* Label */}
              <p className="mt-2.5 text-center text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-neutral-700">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Row 2 — scrolls right (reverse) */}
        <div className="flex w-max gap-4 sm:gap-6" style={{ animation: "marquee 32s linear infinite reverse" }}>
          {[...scrollingMoments].reverse().map((item, i) => (
            <div
              key={`b-${i}`}
              className={`relative shrink-0 w-48 sm:w-64 ${item.color} ${item.border} border-2 rounded-2xl p-2.5 sm:p-3 shadow-[4px_6px_18px_rgba(0,0,0,0.12)] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[6px_10px_28px_rgba(0,0,0,0.18)]`}
              style={{ transform: `rotate(${-item.rotate}deg)` }}
            >
              {/* Tape strip top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 bg-white/70 border border-white/80 rounded-sm shadow-sm z-10 backdrop-blur-sm" />

              {/* Photo */}
              <div className="rounded-xl overflow-hidden aspect-[4/3] shadow-inner">
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>

              {/* Label */}
              <p className="mt-3 text-center text-[11px] font-black uppercase tracking-widest text-neutral-700">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
