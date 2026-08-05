import React from "react";
import { MapPin, Phone, Clock, Navigation, Utensils } from "lucide-react";
import { motion } from "framer-motion";

export default function LocationsSection({ onOpenBooking }) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="locations" className="py-16 lg:py-24 relative text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-orange-50 border border-orange-200/80 text-orange-600 rounded-full font-bold text-xs uppercase tracking-wider">
            Visit Our Cafes
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tighter uppercase">
            OUR BENGALURU{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
              LOCATIONS
            </span>
          </h2>
          <p className="text-neutral-600 text-sm md:text-base font-medium">
            Drop by for a coffee, book an art workshop, or bring your friends to
            relax at either of our aesthetic locations.
          </p>
        </motion.div>

        {/* Location Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
        >
          {/* Location 1: HSR Layout */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-7 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6 border border-white/80 shadow-xl"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 font-extrabold text-[10px] uppercase tracking-wider rounded-full border border-orange-200 mb-2">
                    HSR Layout Branch
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-neutral-900 uppercase tracking-tight">
                    Mixnosh Art Cafe, HSR
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-heading font-black text-lg shadow-md">
                  HSR
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 text-neutral-700 text-sm mt-6 font-medium">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    1919, 21st Main Road, 25th Cross, Sector 2, HSR Layout,
                    Bengaluru, Karnataka
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <a
                      href="tel:+916364330840"
                      className="hover:text-orange-600 font-bold transition-colors"
                    >
                      +91 6364330840
                    </a>
                    <a
                      href="tel:+916364330860"
                      className="hover:text-orange-600 font-bold transition-colors"
                    >
                      +91 6364330860
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span className="font-semibold text-neutral-700">
                    Open Daily: 10:00 AM – 11:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-orange-200/60 grid grid-cols-2 gap-3">
              <a
                href="https://maps.app.goo.gl/EEipkRWcMnYhQdU17"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl text-xs font-bold border border-orange-200 bg-white text-neutral-700 hover:bg-orange-50 hover:text-neutral-900 transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider shadow-sm"
              >
                <Navigation className="w-4 h-4 text-orange-600" /> Directions
              </a>

              <button
                onClick={() => onOpenBooking("table", "HSR Layout")}
                className="py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-sm"
              >
                <Utensils className="w-4 h-4 text-amber-200" /> Book HSR Table
              </button>
            </div>
          </motion.div>

          {/* Location 2: Jayanagar */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-7 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6 border border-white/80 shadow-xl"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 font-extrabold text-[10px] uppercase tracking-wider rounded-full border border-amber-200 mb-2">
                    Jayanagar Branch
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-neutral-900 uppercase tracking-tight">
                    Mixnosh Art Cafe, Jayanagar
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-heading font-black text-lg shadow-md">
                  JYN
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 text-neutral-700 text-sm mt-6 font-medium">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Ground Floor, 13th Cross, 732, 36th Cross Rd, 7th Block,
                    Jayanagar, Bengaluru, Karnataka 560070
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <a
                      href="tel:+919900018115"
                      className="hover:text-orange-600 font-bold transition-colors"
                    >
                      +91 9900018115
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span className="font-semibold text-neutral-700">
                    Open Daily: 10:00 AM – 11:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-orange-200/60 grid grid-cols-2 gap-3">
              <a
                href="https://maps.app.goo.gl/NMUYGs17JYg1qfzv9"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl text-xs font-bold border border-orange-200 bg-white text-neutral-700 hover:bg-orange-50 hover:text-neutral-900 transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider shadow-sm"
              >
                <Navigation className="w-4 h-4 text-amber-500" /> Directions
              </a>

              <button
                onClick={() => onOpenBooking("table", "Jayanagar")}
                className="py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-sm"
              >
                <Utensils className="w-4 h-4 text-amber-200" /> Book Jayanagar Table
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

