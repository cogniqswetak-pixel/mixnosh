import React, { useState } from "react";
import { Calendar, ShoppingBag, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const SNEAKER_IMAGES = [
  "https://admin.mixnosh.in/sneakerandresinart/IMG-20250318-WA0032.jpg",
  "https://admin.mixnosh.in/sneakerandresinart/IMG-20250318-WA0034.jpg",
  "https://admin.mixnosh.in/sneakerandresinart/IMG-20250318-WA0033.jpg",
  "https://admin.mixnosh.in/sneakerandresinart/IMG-20250318-WA0035.jpg",
  "https://admin.mixnosh.in/sneakerandresinart/IMG-20250413-WA0017.jpg",
];

const RESIN_IMAGES = [
  "https://admin.mixnosh.in/sneakerandresinart/Untitled-5.jpg",
  "https://admin.mixnosh.in/sneakerandresinart/IMG-20250318-WA0009.jpg",
  "https://admin.mixnosh.in/sneakerandresinart/IMG-20250318-WA0013.jpg",
  "https://admin.mixnosh.in/sneakerandresinart/IMG-20250329-WA0033.jpg",
  "https://admin.mixnosh.in/sneakerandresinart/IMG-20250415-WA0066.jpg",
  "https://admin.mixnosh.in/sneakerandresinart/IMG-20250415-WA0068.jpg",
];

export default function SneakerResinSection({ onOpenBooking }) {
  const [sneakerIdx, setSneakerIdx] = useState(0);
  const [resinIdx, setResinIdx] = useState(0);

  const prevSneaker = () => setSneakerIdx((prev) => (prev === 0 ? SNEAKER_IMAGES.length - 1 : prev - 1));
  const nextSneaker = () => setSneakerIdx((prev) => (prev === SNEAKER_IMAGES.length - 1 ? 0 : prev + 1));

  const prevResin = () => setResinIdx((prev) => (prev === 0 ? RESIN_IMAGES.length - 1 : prev - 1));
  const nextResin = () => setResinIdx((prev) => (prev === RESIN_IMAGES.length - 1 ? 0 : prev + 1));

  return (
    <section id="customresinsneakers" className="py-16 lg:py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-orange-50 border border-orange-200/80 text-orange-600 rounded-full font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Signature Art Experiences
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 tracking-tighter uppercase">
            CUSTOM SNEAKER &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
              RESIN ART
            </span>
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            Join us for engaging sneaker and resin art workshops, one-on-one art lessons, or fun DIY art sessions — all while enjoying great company and savoring irresistibly delicious food.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Sneaker Art Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between group border border-white/80"
          >
            <div className="space-y-6">
              {/* Image Slider */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src={SNEAKER_IMAGES[sneakerIdx]}
                  alt="Sneaker Art"
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Navigation Controls */}
                <button
                  onClick={prevSneaker}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-neutral-800 hover:bg-orange-500 hover:text-white transition-all backdrop-blur-md shadow-md cursor-pointer"
                  aria-label="Previous Sneaker Image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSneaker}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-neutral-800 hover:bg-orange-500 hover:text-white transition-all backdrop-blur-md shadow-md cursor-pointer"
                  aria-label="Next Sneaker Image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Brand Badge */}
                <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 rounded-full border border-orange-200 shadow-md backdrop-blur-md flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase text-neutral-900 tracking-wider">
                    Powered by Cheeky Sneeky
                  </span>
                </div>

                {/* Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  {SNEAKER_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSneakerIdx(i)}
                      className={`h-2 rounded-full transition-all ${
                        sneakerIdx === i ? "w-6 bg-orange-500" : "w-2 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Instagram Follow Bar */}
              <div className="flex items-center justify-between p-3.5 bg-orange-50/80 rounded-2xl border border-orange-200/80 text-xs font-bold text-neutral-700">
                <span className="flex items-center gap-2">
                  Products, Workshops, Tutorials — Follow Us!
                </span>
                <a
                  href="https://www.instagram.com/cheekysneeky_?igsh=emZlOWRwM2Nyc3Zm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-xl bg-white text-pink-600 hover:bg-pink-600 hover:text-white transition-all shadow-sm flex items-center gap-1 font-extrabold text-[11px]"
                >
                  <InstagramIcon className="w-4 h-4" /> Instagram
                </a>
              </div>

              {/* Text Info */}
              <div className="space-y-2 text-left">
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 uppercase">
                  Sneaker Art
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Turn a plain pair into wearable art. Learn sneaker painting techniques, customize your own kicks, and take home a one-of-a-kind design or shop our collection. Powered by Cheeky Sneeky.
                </p>
              </div>
            </div>

            {/* Action Group */}
            <div className="grid grid-cols-2 gap-3 pt-6 mt-4 border-t border-orange-200/60">
              <button
                onClick={() => onOpenBooking("workshop", "Sneaker Art Customization")}
                className="py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-md"
              >
                <Calendar className="w-4 h-4 text-amber-200" /> Book Now
              </button>

              <a
                href="https://cheekysneeky.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl text-xs font-bold border border-orange-300 bg-white text-neutral-800 hover:bg-orange-50 hover:text-orange-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-orange-500" /> Shop Now
              </a>
            </div>
          </motion.div>

          {/* Resin Art Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between group border border-white/80"
          >
            <div className="space-y-6">
              {/* Image Slider */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src={RESIN_IMAGES[resinIdx]}
                  alt="Resin Art"
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Navigation Controls */}
                <button
                  onClick={prevResin}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-neutral-800 hover:bg-orange-500 hover:text-white transition-all backdrop-blur-md shadow-md cursor-pointer"
                  aria-label="Previous Resin Image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextResin}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-neutral-800 hover:bg-orange-500 hover:text-white transition-all backdrop-blur-md shadow-md cursor-pointer"
                  aria-label="Next Resin Image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Brand Badge */}
                <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 rounded-full border border-orange-200 shadow-md backdrop-blur-md flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase text-neutral-900 tracking-wider">
                    In Collaboration with Kunstwork
                  </span>
                </div>

                {/* Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  {RESIN_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setResinIdx(i)}
                      className={`h-2 rounded-full transition-all ${
                        resinIdx === i ? "w-6 bg-orange-500" : "w-2 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Instagram Follow Bar */}
              <div className="flex items-center justify-between p-3.5 bg-orange-50/80 rounded-2xl border border-orange-200/80 text-xs font-bold text-neutral-700">
                <span className="flex items-center gap-2">
                  Products, Workshops, Tutorials — Follow Us!
                </span>
                <a
                  href="https://www.instagram.com/kunst_work?igsh=MXFzMjByYmNvbDJhcA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-xl bg-white text-pink-600 hover:bg-pink-600 hover:text-white transition-all shadow-sm flex items-center gap-1 font-extrabold text-[11px]"
                >
                  <InstagramIcon className="w-4 h-4" /> Instagram
                </a>
              </div>

              {/* Text Info */}
              <div className="space-y-2 text-left">
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 uppercase">
                  Resin Art
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Pour, swirl, and create stunning epoxy resin coasters, wall art, and clocks at Bengaluru's most aesthetic resin art cafe. Our beginner-friendly workshops are open to all skill levels, in collaboration with Kunstwork.
                </p>
              </div>
            </div>

            {/* Action Group */}
            <div className="pt-6 mt-4 border-t border-orange-200/60">
              <button
                onClick={() => onOpenBooking("workshop", "Epoxy Resin Art Workshop")}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-md"
              >
                <Calendar className="w-4 h-4 text-amber-200" /> Book Resin Workshop Slot
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
