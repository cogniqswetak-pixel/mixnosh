import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

export const WORKSHOPS_DATA = [
  {
    id: "sneaker-art",
    title: "SneakerArt Customization Workshop",
    category: "Sneaker Customization",
    partner: "Powered by Cheeky Sneeky",
    instructor: "Team of talented differently-abled artists",
    price: "₹3,780/-",
    rawPrice: 3780,
    duration: "3 Hours",
    time: "10:00 AM - 1:00 PM",
    locations: ["Mixnosh Jayanagar", "Mixnosh HSR Layout"],
    date: "Upcoming Weekend Slots",
    image: "https://admin.mixnosh.in/sneakerandresinart/IMG-20250318-WA0032.jpg",
    gallery: ["https://admin.mixnosh.in/sneakerandresinart/IMG-20250318-WA0032.jpg", "https://admin.mixnosh.in/sneakerandresinart/IMG-20250318-WA0034.jpg"],
    description:
      "Turn a plain pair into wearable art! Learn sneaker painting techniques, customize your own kicks, and take home a one-of-a-kind design. Led by our team of talented artists for an inclusive, extraordinary experience.",
    inclusions: [
      "Brand new pair of high-quality customizable sneakers",
      "Special durable sneaker acrylic paints & detail brushes",
      "Protective nano-coating water-resistant finish",
      "Step-by-step guidance from expert artists & stencils",
      "All stationery & protective aprons supplied",
      "Inclusive of all GST & taxes",
    ],
    faqs: [
      {
        q: "Do I need prior painting experience?",
        a: "Not at all! Our expert artists assist you every step of the way, from choosing a stencil to laying down base coats and final details.",
      },
      {
        q: "Can I bring my own sneakers?",
        a: "We supply brand new white sneakers included in the fee, but you are also welcome to bring your own clean pair if preferred.",
      },
      {
        q: "How long does the paint last?",
        a: "We finish every sneaker with a water-resistant nano-protective coating so your custom artwork remains durable for everyday wear.",
      },
    ],
  },
  {
    id: "resin-ocean",
    title: "Resin Luxury Ocean Lamp / Clock / Wallart",
    category: "Epoxy Resin Art",
    partner: "In collaboration with Kunstwork",
    instructor: "Charu — International Resin Artist (9+ yrs exp)",
    price: "₹3,950/-",
    rawPrice: 3950,
    duration: "3 Hours",
    time: "10:00 AM - 1:00 PM",
    locations: ["Mixnosh HSR Layout", "Mixnosh Jayanagar"],
    date: "Upcoming Weekend Slots",
    image: "https://admin.mixnosh.in/sneakerandresinart/Untitled-5.jpg",
    gallery: ["https://admin.mixnosh.in/sneakerandresinart/Untitled-5.jpg", "https://admin.mixnosh.in/artfulmoments/resin-art-workshop-bangalore.jpg"],
    description:
      "Pour, swirl, and create stunning epoxy resin coasters, wall art, clocks, or ocean lamps at Bengaluru’s most aesthetic resin art cafe. Perfect for beginners to craft a high-end luxury decor piece.",
    inclusions: [
      "Choice of Ocean Lamp, Clock, Wall Art, or Coaster board base",
      "High-clarity non-toxic epoxy resin & vibrant pigments",
      "Beach sand, real sea shells, glitter & heat gun equipment",
      "Safety gloves, aprons & mixing tools",
      "9+ Years expert guidance by Charu",
      "Item curing & safe pickup package",
    ],
    faqs: [
      {
        q: "When can I take my resin art home?",
        a: "Resin takes 12-24 hours to cure completely. You can safely pick up your cured masterpiece from the cafe the following day or get it delivered.",
      },
      {
        q: "Is resin art safe for beginners?",
        a: "Yes! We provide full protective gear (gloves, aprons, ventilated space) and step-by-step guidance.",
      },
    ],
  },
  {
    id: "beadazzled-canvas",
    title: "Beadazzled Canvas Workshop",
    category: "Mixed Media Art",
    partner: "Art Creators",
    instructor: "Sanjana Setty (10+ yrs exp)",
    price: "₹1,838/-",
    rawPrice: 1838,
    duration: "2 Hours",
    time: "5:00 PM - 7:00 PM",
    locations: ["Mixnosh Jayanagar"],
    date: "Available Slots",
    image: "https://admin.mixnosh.in/artfulmoments/banner-img-3.jpg",
    gallery: ["https://admin.mixnosh.in/artfulmoments/banner-img-3.jpg"],
    description:
      "Design your own textured canvas masterpiece using beautiful beads, pearls, charms, and rhinestones. Guided by Sanjana Setty, founder of Art Creators with 10+ years of experience.",
    inclusions: [
      "Stretched canvas board base",
      "Assorted pearls, glass beads, charms & rhinestones",
      "Specialist craft adhesives & acrylic paints",
      "All stationery & protective aprons",
      "Full guidance by Sanjana Setty",
    ],
    faqs: [
      {
        q: "Is this workshop suitable for kids?",
        a: "Yes! It is popular with both adults and teens (ages 10+).",
      },
    ],
  },
  {
    id: "tote-bag-painting",
    title: "Tote Bag & Cap Painting",
    category: "Fabric Customization",
    partner: "Mixnosh Studio",
    instructor: "Mixnosh Resident Artists",
    price: "₹1,499/-",
    rawPrice: 1499,
    duration: "2 Hours",
    time: "Flexible Cafe Timings",
    locations: ["Mixnosh HSR Layout", "Mixnosh Jayanagar"],
    date: "Daily Walk-Ins & Bookings",
    image: "https://admin.mixnosh.in/sneakerandresinart/IMG-20250318-WA0034.jpg",
    gallery: ["https://admin.mixnosh.in/sneakerandresinart/IMG-20250318-WA0034.jpg"],
    description:
      "Transform canvas tote bags or caps into personalized everyday accessories with washable fabric paints, anime stencils, and pop-art motifs.",
    inclusions: [
      "100% Cotton canvas tote bag or cap",
      "Fabric acrylic paints & markers",
      "Design templates & stencils",
      "Complimentary iced tea or coffee",
    ],
    faqs: [
      {
        q: "Is the paint washable?",
        a: "Yes, once heat-cured, the fabric paints are 100% washable.",
      },
    ],
  },
];

export default function WorkshopsSection({ onSelectWorkshop, onOpenBooking }) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const categories = [
    "All",
    "Sneaker Customization",
    "Epoxy Resin Art",
    "Mixed Media Art",
    "Fabric Customization",
  ];

  const filteredWorkshops =
    selectedFilter === "All"
      ? WORKSHOPS_DATA
      : WORKSHOPS_DATA.filter((w) => w.category === selectedFilter);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="workshops" className="py-16 lg:py-24 bg-transparent text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 text-left"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-50 border border-orange-200/80 text-orange-600 rounded-full font-bold text-xs uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Discover Your
              Inner Artist
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 tracking-tighter uppercase">
              HANDS-ON{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
                WORKSHOPS
              </span>
            </h2>
            <p className="text-neutral-600 text-base md:text-lg mt-3">
              Learn, paint, and create your custom artwork with all materials
              included and step-by-step guidance from expert artists.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking("workshop")}
            className="px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-orange-100" />
            Book Workshop Slot
          </button>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === cat
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-white text-neutral-600 hover:bg-orange-50 hover:text-neutral-900 border border-orange-200/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Workshop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredWorkshops.map((item) => (
            <motion.div
              variants={cardVariants}
              key={item.id}
              className="glass-panel p-5 sm:p-6 rounded-3xl flex flex-col justify-between text-left group border border-white/80"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 shadow-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/90 border border-orange-200 text-orange-600 text-xs font-extrabold rounded-full backdrop-blur-md uppercase tracking-wider shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Price Tag Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-white drop-shadow-md">
                      {item.price}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold bg-white/90 text-neutral-800 border border-orange-200 px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />{" "}
                      {item.duration}
                    </span>
                  </div>
                </div>

                {/* Info Body */}
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-2xl text-neutral-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-4 text-xs text-neutral-700 font-medium border-t border-orange-200/50">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>
                        <strong className="text-neutral-900">
                          Instructor:
                        </strong>{" "}
                        {item.instructor}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>
                        <strong className="text-neutral-900">Venues:</strong>{" "}
                        {item.locations.join(" • ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-6">
                <button
                  onClick={() => onSelectWorkshop(item)}
                  className="py-3 px-4 rounded-xl text-xs font-bold border border-orange-300/80 bg-white text-neutral-700 hover:bg-orange-50 hover:text-neutral-900 transition-all text-center cursor-pointer uppercase tracking-wider"
                >
                  View Details
                </button>

                <button
                  onClick={() => onOpenBooking("workshop", item.title)}
                  className="py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-sm"
                >
                  Book Slot <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

