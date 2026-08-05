import React from "react";
import {
  BookOpen,
  MapPin,
  Sparkles,
  MessageCircle,
  PenTool,
  Coffee,
} from "lucide-react";
import { motion } from "framer-motion";

export default function BookClubSection({ onOpenBooking }) {
  return (
    <section
      id="bookclub"
      className="py-8 sm:py-12 lg:py-16 relative overflow-hidden text-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-3xl p-7 sm:p-10 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left border border-white/80 shadow-xl"
        >
          {/* Left Visual Illustration & Card */}
          <div className="lg:col-span-5 relative group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden border border-orange-200 bg-white aspect-[4/3] shadow-md"
            >
              <img
                src="https://admin.mixnosh.in/creativeself/Art & Events Collage.png"
                alt="Mixnosh Book Club"
                className="w-full h-full object-cover group-hover:scale-108 group-hover:rotate-1 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-neutral-950 font-extrabold text-[10px] uppercase tracking-wider rounded-full shadow-sm mb-2">
                  <BookOpen className="w-3.5 h-3.5" /> Mixnosh Readers
                </span>
                <h4 className="font-heading font-black text-lg text-white uppercase tracking-tight drop-shadow-md">
                  Silent Readings & Story Hours
                </h4>
              </div>
            </motion.div>
          </div>

          {/* Right Info */}
          <div className="lg:col-span-7 space-y-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full font-bold text-xs uppercase tracking-wider border border-orange-200/80"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Unique Cafe Program
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter text-neutral-900"
            >
              MIXNOSH{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
                BOOK CLUB
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-neutral-600 text-base md:text-lg leading-relaxed font-medium"
            >
              Join the Mixnosh Book Club — a delightful departure from the usual
              format. Enjoy silent reading sessions, thought-provoking book
              discussions, and impromptu story-writing prompts over warm coffee
              and artisan teas.
            </motion.p>

            {/* Program Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs md:text-sm font-semibold text-neutral-700"
            >
              <div className="flex items-center gap-2.5 bg-white/90 p-3.5 rounded-2xl border border-orange-200/70 shadow-sm">
                <Coffee className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Silent Reading & Coffee Hours</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/90 p-3.5 rounded-2xl border border-orange-200/70 shadow-sm">
                <MessageCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Thought-Provoking Discussions</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/90 p-3.5 rounded-2xl border border-orange-200/70 shadow-sm">
                <PenTool className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Impromptu Creative Writing</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/90 p-3.5 rounded-2xl border border-orange-200/70 shadow-sm">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                <span>HSR & Jayanagar Branches</span>
              </div>
            </motion.div>

            {/* Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-2 flex flex-wrap gap-4"
            >
              <button
                onClick={() => onOpenBooking("table")}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer hover:scale-105"
              >
                Join Next Book Club Session
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

