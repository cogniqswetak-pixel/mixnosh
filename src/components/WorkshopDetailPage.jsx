import React, { useState } from "react";
import {
  ArrowLeft,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkshopDetailPage({
  workshop,
  onBack,
  onOpenBooking,
}) {
  const [openFaq, setOpenFaq] = useState(0);

  if (!workshop) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 relative min-h-screen text-left text-neutral-900"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-neutral-800 text-xs font-extrabold shadow-sm hover:bg-orange-50 hover:text-orange-600 transition-all mb-8 cursor-pointer border border-orange-200 uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" /> Back to Workshops
        </motion.button>

        {/* Top Hero Banner Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-3xl overflow-hidden shadow-xl border border-white/80 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Hero Image */}
            <div className="lg:col-span-6 relative h-[350px] lg:h-auto min-h-[350px]">
              <img
                src={workshop.image}
                alt={workshop.title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3.5 py-1 bg-white/90 text-orange-600 font-extrabold text-[11px] uppercase tracking-wider rounded-full border border-orange-200 shadow-sm backdrop-blur-md">
                  {workshop.category}
                </span>
                {workshop.partner && (
                  <span className="px-3.5 py-1 bg-amber-500/90 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-full shadow-sm backdrop-blur-md">
                    {workshop.partner}
                  </span>
                )}
              </div>
            </div>

            {/* Right Workshop Details */}
            <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between space-y-6 bg-white/90">
              <div>
                <span className="text-orange-600 font-extrabold text-xs uppercase tracking-widest block mb-2">
                  Featured Experience
                </span>
                <h1 className="font-heading font-black text-3xl sm:text-4xl text-neutral-900 mb-4 leading-tight uppercase tracking-tight">
                  {workshop.title}
                </h1>
                <p className="text-neutral-600 text-base leading-relaxed mb-6">
                  {workshop.description}
                </p>

                {/* Key Quick Info Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-orange-50/70 rounded-2xl border border-orange-200/80 text-xs">
                  <div>
                    <span className="text-neutral-500 font-bold block uppercase tracking-wider">
                      Price / Person
                    </span>
                    <span className="font-heading font-black text-xl text-orange-600 mt-1 block">
                      {workshop.price}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-bold block uppercase tracking-wider">
                      Duration
                    </span>
                    <span className="font-bold text-neutral-900 flex items-center gap-1.5 mt-2 uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />{" "}
                      {workshop.duration}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-neutral-500 font-bold block uppercase tracking-wider">
                      Skill Level
                    </span>
                    <span className="font-bold text-neutral-900 flex items-center gap-1.5 mt-2 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-orange-600" />{" "}
                      Beginners
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructor & Location info */}
              <div className="space-y-2.5 text-xs sm:text-sm text-neutral-700 pt-4 border-t border-orange-200/60 font-medium">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="uppercase tracking-wider">
                    <strong className="text-neutral-900">Instructor:</strong> {workshop.instructor}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                  <span className="uppercase tracking-wider">
                    <strong className="text-neutral-900">Venue:</strong> {workshop.locations.join(" & ")}
                  </span>
                </div>
              </div>

              {/* Book CTA */}
              <button
                onClick={() => onOpenBooking("workshop", workshop.title)}
                className="w-full py-4 rounded-2xl font-heading font-black text-sm uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Calendar className="w-4 h-4 text-amber-200" /> Book Now ({workshop.price})
              </button>
            </div>
          </div>
        </motion.div>

        {/* Section 2: What's Included & Gallery Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12"
        >
          {/* Left: What's Included */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-white/80">
            <h2 className="font-heading font-black text-2xl text-neutral-900 mb-6 flex items-center gap-2.5 uppercase tracking-tight">
              <ShieldCheck className="w-6 h-6 text-orange-600" /> What's Included
            </h2>
            <ul className="space-y-4">
              {workshop.inclusions.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-neutral-700 text-sm md:text-base font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Gallery Showcase */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-white/80">
            <h2 className="font-heading font-black text-2xl text-neutral-900 mb-6 uppercase tracking-tight">
              Gallery Showcase
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {workshop.gallery.map((imgUrl, i) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={i}
                  className="h-36 rounded-2xl overflow-hidden border border-orange-200/80 bg-white group shadow-sm"
                >
                  <img
                    src={imgUrl}
                    alt={`Gallery ${i}`}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 3: FAQs Accordion */}
        {workshop.faqs && workshop.faqs.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 rounded-3xl border border-white/80 mb-12"
          >
            <h2 className="font-heading font-black text-2xl text-neutral-900 mb-2 flex items-center gap-2.5 uppercase tracking-tight">
              <HelpCircle className="w-6 h-6 text-amber-500" /> Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 text-sm mb-8 font-medium">
              Everything you need to know before attending your session at Mixnosh Art Cafe.
            </p>

            <div className="space-y-4">
              {workshop.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-orange-200/80 rounded-2xl overflow-hidden transition-all bg-white/90"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    className="w-full p-5 text-left font-bold text-neutral-900 flex items-center justify-between hover:bg-orange-50/50 transition-colors cursor-pointer uppercase tracking-wider text-xs md:text-sm"
                  >
                    <span>{faq.q}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-orange-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 text-neutral-600 text-sm leading-relaxed border-t border-orange-100 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="glass-panel bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-white text-neutral-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-orange-300/80 shadow-xl mt-8"
        >
          <h2 className="font-heading font-black text-3xl sm:text-4xl mb-3 uppercase tracking-tighter">
            READY TO CREATE?
          </h2>
          <p className="text-neutral-600 text-sm font-semibold max-w-xl mx-auto mb-8 uppercase tracking-wider">
            Reserve your spot for {workshop.title} at Mixnosh HSR Layout or Jayanagar.
          </p>
          <button
            onClick={() => onOpenBooking("workshop", workshop.title)}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-heading font-black text-sm uppercase tracking-wider rounded-full shadow-md transition-all cursor-pointer inline-flex items-center gap-2 hover:scale-105"
          >
            <Calendar className="w-4 h-4 text-amber-200" /> Book Now - {workshop.price}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

