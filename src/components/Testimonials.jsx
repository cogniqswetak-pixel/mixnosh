import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const REVIEWS = [
  {
    name: "Adithya Kamath",
    location: "HSR Branch Patron",
    rating: 5,
    quote: "Tried the iced tea — easily one of the best I've had in a while. 5/5 service — the staff is very kind and they take good care of you without being overwhelming.",
  },
  {
    name: "Kanishka Agrawal",
    location: "Art Workshop Guest",
    rating: 5,
    quote: "Amazing place. Everybody must visit. They have amazing food and the best part — it's an art cafe! Go and explore your inner artist. The people are extremely welcoming.",
  },
  {
    name: "Abhishek Thakur",
    location: "Cafe Regular",
    rating: 5,
    quote: "Calming environment and great food — I'm convinced they pump relaxation gas into the air and secretly add happiness powder to the dishes! 🤩",
  },
  {
    name: "Deepika Pusala",
    location: "Weekend Creator",
    rating: 5,
    quote: "Visited MixNosh today and absolutely loved the whole vibe! 🎨 A perfect mix of tasty continental dishes and creative art activities. The Walnut Choco Brownie with ice cream was heavenly!",
  },
  {
    name: "Vetrivel Palaniappan",
    location: "Jayanagar Branch Guest",
    rating: 5,
    quote: "Positive vibes all over this place! With colours and canvas provided, Mixnosh helps bring alive your inner artist. Spent some wonderful together-time with very warm hospitality 👏",
  },
  {
    name: "Suchitha Konerira",
    location: "Resin Art Participant",
    rating: 5,
    quote: "MixNosh the name itself stands unique and so it is. Charu makes us feel at home and more like a friend, which makes the entire learning process like a fun activity.",
  },
  {
    name: "Govind Moghekar",
    location: "Cafe Visitor",
    rating: 5,
    quote: "The tangy pasta was bursting with flavor, the garlic bread was perfectly crisp, and the burger was super juicy. Great spot whether you're working or catching up with friends.",
  },
  {
    name: "Raksha V",
    location: "Jayanagar Branch Guest",
    rating: 5,
    quote: "The ambiance was really good! Ridhi is such a wonderful person, and the food was delicious. The handmade paintings and resin art were beautiful too. Loved the overall experience!",
  },
  {
    name: "Nupur Talukdar",
    location: "Art Cafe Regular",
    rating: 5,
    quote: "A wonderful art café. The DIY art activities are amazing and add a fun, creative touch. A perfect spot to relax, eat well, and let your artistic side come out. Highly recommend.",
  },
  {
    name: "Shais Ahmed",
    location: "Corporate Team Visit",
    rating: 5,
    quote: "We visited as a small team for a team bonding activity, and the experience was nothing short of magnificent. The café has a warm, cozy vibe that instantly makes you feel at home.",
  },
];

const CARD_COLORS = [
  "from-orange-50 to-amber-50 border-orange-200",
  "from-amber-50 to-yellow-50 border-amber-200",
  "from-pink-50 to-orange-50 border-pink-200",
  "from-sky-50 to-blue-50 border-sky-200",
  "from-violet-50 to-purple-50 border-violet-200",
  "from-lime-50 to-green-50 border-lime-200",
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextReview = () => setActiveIdx((prev) => (prev + 1) % REVIEWS.length);
  const prevReview = () => setActiveIdx((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  const scrollSet = [...REVIEWS, ...REVIEWS];

  return (
    <section className="pt-4 pb-10 lg:pt-6 lg:pb-14 relative overflow-hidden text-neutral-900 -mt-4">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">

        {/* Section Header — compact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <span className="inline-block px-3 py-1 bg-orange-50 border border-orange-200/80 text-orange-600 rounded-full font-bold text-[10px] uppercase tracking-wider mb-2">
            ⭐ Verified Patron Feedback
          </span>
          <h2 className="font-heading font-black text-xl sm:text-3xl text-neutral-900 tracking-tighter uppercase">
            Hear From Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
              Happy Clients
            </span>
          </h2>
        </motion.div>

        {/* Featured Auto-Cycling Review */}
        <div className="relative mb-8 max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`bg-gradient-to-br ${CARD_COLORS[activeIdx % CARD_COLORS.length]} border-2 rounded-2xl p-5 sm:p-7 shadow-lg relative`}
            >
              {/* Large quote mark */}
              <Quote className="absolute top-4 right-5 w-8 h-8 text-orange-400/20 pointer-events-none" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-[10px] font-black text-white bg-gradient-to-r from-orange-500 to-amber-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  5.0 / 5.0
                </span>
              </div>

              {/* Quote */}
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed italic mb-4">
                "{REVIEWS[activeIdx].quote}"
              </p>

              {/* Author + Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-heading font-black flex items-center justify-center text-sm shadow-md shrink-0">
                    {REVIEWS[activeIdx].name[0]}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-neutral-900 text-xs flex items-center gap-1 uppercase">
                      {REVIEWS[activeIdx].name}
                      <CheckCircle2 className="w-3 h-3 text-orange-500 inline" />
                    </h4>
                    <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider">
                      {REVIEWS[activeIdx].location} · Google
                    </span>
                  </div>
                </div>

                {/* Prev / Next + dots */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevReview}
                    className="w-8 h-8 rounded-full border border-orange-200 bg-white hover:bg-orange-50 text-neutral-700 hover:text-orange-600 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-90"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextReview}
                    className="w-8 h-8 rounded-full border border-orange-200 bg-white hover:bg-orange-50 text-neutral-700 hover:text-orange-600 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-90"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIdx
                    ? "w-5 h-1.5 bg-orange-500"
                    : "w-1.5 h-1.5 bg-orange-200 hover:bg-orange-300"
                }`}
              />
            ))}
          </div>
        </div>



      </div>
    </section>
  );
}
