import React, { useState } from "react";
import {
  Utensils,
  ExternalLink,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Grid,
  Bookmark,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThreeDBook from "./ThreeDBook";

/* ── MENU DATA ── */
const MENU_PAGES = [
  {
    category: "Signatures & Mains",
    subtitle: "Chef's Handcrafted Specialties",
    leftPage: [
      {
        name: "Pav Bhaji with Egg Burji",
        tag: "House Special Combo",
        desc: "Fluffy toasted buttered buns served with iconic rich pav bhaji and spicy egg burji.",
        price: "₹280",
        image:
          "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Tangy Creamy Blush Pasta",
        tag: "Chef Special",
        desc: "Penne tossed in a rich, tangy blush cream sauce with fresh herbs and garlic toast.",
        price: "₹340",
        image:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
      },
    ],
    rightPage: [
      {
        name: "Gourmet Artisan Burger",
        tag: "Popular Choice",
        desc: "Juicy handcrafted patty with melted cheese, caramelised onions & crisp french fries.",
        price: "₹320",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Smoked Paprika Arrabbiata",
        tag: "Spicy Favorite",
        desc: "Penne in fiery garlic plum tomato sauce topped with shaved parmesan & fresh basil.",
        price: "₹310",
        image:
          "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    category: "Starters & Comfort",
    subtitle: "Warm Delights & Crispy Bites",
    leftPage: [
      {
        name: "Crispy Garlic Bread & Cheese",
        tag: "Crowd Favorite",
        desc: "Freshly baked baguette slathered in garlic butter, oregano & melted mozzarella cheese.",
        price: "₹220",
        image:
          "https://images.unsplash.com/photo-1619881590738-a111d176d906?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Comforting Cream of Chicken Soup",
        tag: "Warm & Homely",
        desc: "Silky smooth velvet cream of chicken soup served warm with seasoned croutons.",
        price: "₹240",
        image:
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
      },
    ],
    rightPage: [
      {
        name: "Loaded Cheesy Peri-Peri Fries",
        tag: "Crispy Delight",
        desc: "Golden fries dusted with zesty peri-peri spice mix & drizzled with warm cheese sauce.",
        price: "₹210",
        image:
          "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Artisan Bruschetta Trio",
        tag: "Fresh Antipasto",
        desc: "Toasted crostini topped with marinated cherry tomatoes, basil pesto & mushroom spread.",
        price: "₹250",
        image:
          "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    category: "Desserts & Beverages",
    subtitle: "Sweet Indulgences & Chilled Brews",
    leftPage: [
      {
        name: "Walnut Choco Brownie with Marshmallow",
        tag: "Must Try Dessert",
        desc: "Warm fudgy walnut brownie topped with vanilla ice cream & gooey marshmallow.",
        price: "₹260",
        image:
          "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Mixnosh Signature Iced Tea",
        tag: "Bestseller Beverage",
        desc: "Hand-crafted refreshing lemon mint peach iced tea served chilled over crushed ice.",
        price: "₹180",
        image:
          "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=800&q=80",
      },
    ],
    rightPage: [
      {
        name: "Rich Comforting Hot Chocolate",
        tag: "Cozy Drink",
        desc: "Thick, velvety dark chocolate warm drink topped with marshmallows.",
        price: "₹220",
        image:
          "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Classic Hazelnut Cold Brew",
        tag: "Barista Special",
        desc: "Slow-steeped artisan cold brew coffee infused with roasted hazelnut syrup & cold foam.",
        price: "₹240",
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

/* ── 3D FLIP MENU CARD COMPONENT ── */
function FlipMenuCard({ item, idx, onOpenBooking }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (idx % 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-[340px] w-full [perspective:1200px] cursor-pointer group select-none"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* ── FRONT: Dish Image + Price + Flip Hint ── */}
        <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-lg border-2 border-white group-hover:border-orange-400 group-hover:shadow-[0_20px_45px_-12px_rgba(249,115,22,0.3)] transition-all duration-300 [backface-visibility:hidden]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-black/20" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            {item.tag ? (
              <span className="px-3.5 py-1 bg-amber-400 text-neutral-950 font-black text-[10px] uppercase tracking-widest rounded-full shadow-md">
                {item.tag}
              </span>
            ) : (
              <span />
            )}
            <span className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-heading font-black text-lg rounded-full shadow-lg">
              {item.price}
            </span>
          </div>

          {/* Bottom Name & Flip Prompt */}
          <div className="absolute bottom-5 left-5 right-5 text-white text-left z-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block mb-1">
              Category · {item.category}
            </span>
            <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight leading-tight text-white drop-shadow-md">
              {item.name}
            </h3>
            <div className="mt-3 flex items-center text-xs text-white/90 font-bold border-t border-white/20 pt-2.5">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> Freshly Made
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK: Full Detail Card ── */}
        <div className="absolute inset-0 w-full h-full rounded-3xl bg-white border-2 border-orange-200 shadow-xl p-6 sm:p-7 flex flex-col justify-between text-left [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div>
            <div className="flex items-start justify-between gap-3 border-b-2 border-orange-100 pb-3 mb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">
                  {item.category}
                </span>
                <h3 className="font-heading font-black text-lg sm:text-xl text-neutral-900 uppercase tracking-tight">
                  {item.name}
                </h3>
              </div>
              <span className="font-heading font-black text-xl text-orange-600 bg-orange-50 px-3 py-1 rounded-xl border border-orange-200 shrink-0">
                {item.price}
              </span>
            </div>

            {item.tag && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider rounded-full border border-amber-200 mb-3">
                <Sparkles className="w-3 h-3 text-amber-600" />
                {item.tag}
              </span>
            )}

            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-medium mb-4">
              "{item.desc}"
            </p>

            <ul className="space-y-1.5 text-xs text-neutral-700 font-semibold mb-3">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>Made fresh to order with premium ingredients</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Available at HSR Layout & Jayanagar</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-orange-100 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-black text-neutral-500 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Freshly Made Daily
            </span>
            <span className="text-[11px] font-black text-orange-600 uppercase tracking-wider">
              HSR &amp; Jayanagar
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── MAIN DINING SECTION ── */
export default function DiningSection({
  onOpenBooking,
  onOpenMenu,
  activeLocation,
  setActiveLocation,
}) {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "book"
  const [flipDirection, setFlipDirection] = useState("next");

  const totalPages = MENU_PAGES.length;
  const activeBookPage = MENU_PAGES[currentPage];

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setFlipDirection("next");
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setFlipDirection("prev");
      setCurrentPage((prev) => prev - 1);
    }
  };

  const allMenuItems = MENU_PAGES.flatMap((p) => [
    ...p.leftPage.map((i) => ({ ...i, category: p.category })),
    ...p.rightPage.map((i) => ({ ...i, category: p.category })),
  ]);

  return (
    <section
      id="dine"
      className="py-16 lg:py-24 relative overflow-hidden text-neutral-900 bg-[#faf8f5]"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="inline-block px-4 py-1.5 bg-orange-100/90 border border-orange-200 text-orange-600 rounded-full font-black text-xs uppercase tracking-widest shadow-sm">
            Taste. Explore. Indulge.
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter uppercase text-neutral-900 leading-none">
            DINE &amp; UNWIND AT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
              MIXNOSH
            </span>
          </h2>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-medium">
            Hover or tap the cards to flip and reveal full dish details. Switch to Menu Book to browse page-by-page!
          </p>

          {/* Toggle View Mode */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex p-1 bg-white border border-orange-200 rounded-full shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <Grid className="w-4 h-4" /> 3D Flip Cards
              </button>
              <button
                onClick={() => setViewMode("book")}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  viewMode === "book"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <BookOpen className="w-4 h-4" /> Menu Book
              </button>
            </div>

            <button
              onClick={onOpenMenu}
              className="px-6 py-2.5 rounded-full bg-neutral-900 text-white font-black text-xs uppercase tracking-wider shadow-md hover:bg-orange-600 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" /> Full Scan Menu
            </button>
          </div>
        </motion.div>

        {/* Location Selection Cards */}
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: "hsr", label: "HSR Layout Branch", sub: "Sector 2, 21st Main Rd", abbr: "HSR" },
            { key: "jayanagar", label: "Jayanagar Branch", sub: "7th Block, 36th Cross Rd", abbr: "JYN" },
          ].map(({ key, label, sub, abbr }) => (
            <button
              key={key}
              onClick={() => setActiveLocation(key)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                activeLocation === key
                  ? "border-orange-500 bg-white ring-2 ring-orange-500/20 shadow-md"
                  : "border-orange-200/80 bg-white/80 hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-heading font-black text-sm ${
                    activeLocation === key ? "bg-orange-500 text-white" : "bg-orange-100 text-neutral-700"
                  }`}
                >
                  {abbr}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-neutral-900 text-sm uppercase">{label}</h4>
                  <p className="text-[11px] text-neutral-500 font-medium">{sub}</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  activeLocation === key ? "bg-orange-100 text-orange-600" : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {activeLocation === key ? "Selected" : "Select"}
              </span>
            </button>
          ))}
        </div>

        {/* ── VIEW MODE 1: 3D FLIP MENU CARDS ── */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allMenuItems.map((item, idx) => (
              <FlipMenuCard
                key={idx}
                item={item}
                idx={idx}
                onOpenBooking={onOpenBooking}
              />
            ))}
          </div>
        )}

        {/* ── VIEW MODE 2: ANIMATED MENU BOOK ── */}
        {viewMode === "book" && (
          <ThreeDBook
            pages={MENU_PAGES}
            activeLocation={activeLocation}
            onOpenBooking={onOpenBooking}
          />
        )}

        {/* ── Delivery Partners & Table Booking CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 md:p-12 border border-orange-200/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left bg-gradient-to-br from-white via-orange-50/40 to-white"
        >
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-neutral-900 uppercase tracking-tighter">
              Reserve a Table or Order Delivery
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed font-medium">
              Join us for coffee, pasta, and painting — or get your favorite dishes delivered straight to your door via our official delivery partners.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <button
                onClick={() => onOpenBooking("table")}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all inline-flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <Utensils className="w-4 h-4 text-amber-200" /> Reserve Table Now
              </button>

              <button
                onClick={onOpenMenu}
                className="px-6 py-3.5 rounded-full border-2 border-orange-400 bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-orange-500" /> Explore Full Menu
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-orange-200/80 pt-6 lg:pt-0 lg:pl-8">
            <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 block mb-4">
              Order Online via Delivery Partners
            </span>

            <div className="grid grid-cols-3 gap-3">
              <a
                href="https://www.swiggy.com/city/bangalore/mixnosh-indias-first-sneaker-and-resin-art-cafe-sector-2-hsr-rest921314"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white hover:bg-orange-50/80 rounded-2xl text-center border border-orange-200/80 transition-all flex flex-col items-center justify-center gap-1 group shadow-sm"
              >
                <span className="font-heading font-black text-orange-600 text-sm uppercase tracking-wider group-hover:scale-105 transition-transform">
                  Swiggy
                </span>
                <span className="text-[10px] text-neutral-500 flex items-center gap-0.5 uppercase font-bold">
                  Order <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </a>

              <a
                href="https://zomato.onelink.me/xqzv/fopfn48a"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white hover:bg-orange-50/80 rounded-2xl text-center border border-orange-200/80 transition-all flex flex-col items-center justify-center gap-1 group shadow-sm"
              >
                <span className="font-heading font-black text-red-500 text-sm uppercase tracking-wider group-hover:scale-105 transition-transform">
                  Zomato
                </span>
                <span className="text-[10px] text-neutral-500 flex items-center gap-0.5 uppercase font-bold">
                  Order <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </a>

              <a
                href="https://magicpin.in/profilemerchant?userId=49622983&searchQuery=Mixnosh&suggestionType=MERCHANTNAME&utm_source=search&utm_medium=suggester&utm_campaign=$suggester&utm_term=Mixnosh&enableYSF=false"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white hover:bg-orange-50/80 rounded-2xl text-center border border-orange-200/80 transition-all flex flex-col items-center justify-center gap-1 group shadow-sm"
              >
                <span className="font-heading font-black text-amber-600 text-sm uppercase tracking-wider group-hover:scale-105 transition-transform">
                  Magicpin
                </span>
                <span className="text-[10px] text-neutral-500 flex items-center gap-0.5 uppercase font-bold">
                  Order <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
