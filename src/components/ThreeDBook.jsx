import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Bookmark, Sparkles, Utensils } from "lucide-react";

export default function ThreeDBook({ pages, activeLocation, onOpenBooking }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null); // 'next' | 'prev'

  const totalPages = pages.length;

  const handleNext = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setFlipDirection("next");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
      }, 750);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection("prev");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
      }, 750);
    }
  };

  const handleTabClick = (targetIdx) => {
    if (targetIdx === currentPage || isFlipping) return;
    const dir = targetIdx > currentPage ? "next" : "prev";
    setFlipDirection(dir);
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(targetIdx);
      setIsFlipping(false);
    }, 750);
  };

  const activeSpread = pages[currentPage];
  const nextSpread = pages[currentPage + 1] || pages[currentPage];
  const prevSpread = pages[currentPage - 1] || pages[currentPage];

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-2 sm:px-4 select-none">
      {/* ── TOP CATEGORY NAVIGATION TABS ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {pages.map((page, idx) => (
            <button
              key={idx}
              onClick={() => handleTabClick(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 shadow-sm ${
                currentPage === idx
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/25 scale-105"
                  : "bg-white/90 text-neutral-700 hover:bg-orange-50 border border-orange-200"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              {page.category}
            </button>
          ))}
        </div>

        {/* Page counter & Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0 || isFlipping}
            className="w-9 h-9 rounded-full bg-white border border-orange-200 text-neutral-800 flex items-center justify-center hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-black uppercase tracking-widest text-neutral-600 px-2">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1 || isFlipping}
            className="w-9 h-9 rounded-full bg-white border border-orange-200 text-neutral-800 flex items-center justify-center hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── HARDCOVER 3D LEATHER BOOK FRAME ── */}
      <div
        className="relative mx-auto rounded-3xl p-3 sm:p-6 md:p-8 bg-gradient-to-b from-[#2a1b14] via-[#1c120d] to-[#120b08] border-4 border-[#3d271d] shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-all duration-500"
        style={{ perspective: "1800px" }}
      >
        {/* Leather Grain Overlay Texture */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 via-transparent to-black/40 pointer-events-none" />

        {/* Embossed Corner Decorations */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-500/30 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-500/30 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-500/30 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-500/30 rounded-br-xl pointer-events-none" />

        {/* ── OPEN BOOK SPREAD (CONTAINER FOR STACK & FLIPPING SHEET) ── */}
        <div
          className="relative rounded-2xl bg-[#faf6ee] border border-[#e8ded0] shadow-2xl min-h-[480px] sm:min-h-[520px] overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Stacked Paper Edge Effect */}
          <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-[#d9cfbe] via-[#ebdcc7] to-transparent z-20 pointer-events-none border-r border-[#d4c6b1]" />
          <div className="absolute top-0 bottom-0 right-0 w-2.5 bg-gradient-to-l from-[#d9cfbe] via-[#ebdcc7] to-transparent z-20 pointer-events-none border-l border-[#d4c6b1]" />

          {/* Spine Center Crease */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 bg-gradient-to-r from-black/25 via-black/10 to-black/25 z-30 pointer-events-none flex items-center justify-center">
            <div className="w-0.5 h-full bg-[#c9bba6]/60 shadow-sm" />
          </div>

          {/* ── BASE SPREAD (UNDERNEATH) ── */}
          <div className="relative w-full h-full min-h-[480px] sm:min-h-[520px] grid grid-cols-1 md:grid-cols-2">
            
            {/* LEFT BASE PAGE */}
            <div
              className="p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e3d8c5]"
              style={{
                background: "linear-gradient(to right, #f6f0e4 0%, #faf6ee 12%, #faf6ee 90%, #eee4d2 100%)",
              }}
            >
              <div>
                <div className="border-b-2 border-orange-500/80 pb-3 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">
                      {isFlipping && flipDirection === "prev" ? prevSpread.category : activeSpread.category}
                    </span>
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-neutral-900 uppercase tracking-tight">
                      Signatures &amp; Mains
                    </h3>
                  </div>
                  <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest border border-amber-300/60 px-2 py-0.5 rounded bg-amber-50/60">
                    Mixnosh
                  </span>
                </div>

                <div className="space-y-6">
                  {(isFlipping && flipDirection === "prev" ? prevSpread : activeSpread).leftPage.map((item, i) => (
                    <div key={i} className="group">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-heading font-bold text-sm sm:text-base text-neutral-900 uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                          {item.name}
                        </h4>
                        <span className="border-b border-dotted border-neutral-400 flex-grow mx-2" />
                        <span className="font-heading font-black text-base sm:text-lg text-orange-600 shrink-0">
                          {item.price}
                        </span>
                      </div>
                      {item.tag && (
                        <span className="inline-flex items-center gap-1 mt-1 text-[9.5px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded shadow-sm">
                          <Sparkles className="w-2.5 h-2.5 text-amber-700" />
                          {item.tag}
                        </span>
                      )}
                      <p className="text-neutral-600 text-xs leading-relaxed mt-1 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[#e5dbc9] flex items-center justify-between text-[10.5px] font-bold text-neutral-500 uppercase tracking-wider">
                <span>{activeLocation === "hsr" ? "HSR Layout" : "Jayanagar"} Branch</span>
                <span className="text-orange-600 flex items-center gap-1 font-extrabold">
                  <Utensils className="w-3 h-3 text-orange-500" /> Freshly Crafted
                </span>
              </div>
            </div>

            {/* RIGHT BASE PAGE */}
            <div
              className="p-6 sm:p-8 md:p-10 flex flex-col justify-between"
              style={{
                background: "linear-gradient(to left, #f6f0e4 0%, #faf6ee 12%, #faf6ee 90%, #eee4d2 100%)",
              }}
            >
              <div>
                <div className="border-b-2 border-amber-500/80 pb-3 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                      {isFlipping && flipDirection === "next" ? nextSpread.subtitle : activeSpread.subtitle}
                    </span>
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-neutral-900 uppercase tracking-tight">
                      Specialties &amp; Brews
                    </h3>
                  </div>
                  <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest border border-amber-300/60 px-2 py-0.5 rounded bg-amber-50/60">
                    Mixnosh
                  </span>
                </div>

                <div className="space-y-6">
                  {(isFlipping && flipDirection === "next" ? nextSpread : activeSpread).rightPage.map((item, i) => (
                    <div key={i} className="group">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-heading font-bold text-sm sm:text-base text-neutral-900 uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                          {item.name}
                        </h4>
                        <span className="border-b border-dotted border-neutral-400 flex-grow mx-2" />
                        <span className="font-heading font-black text-base sm:text-lg text-orange-600 shrink-0">
                          {item.price}
                        </span>
                      </div>
                      {item.tag && (
                        <span className="inline-flex items-center gap-1 mt-1 text-[9.5px] font-extrabold uppercase tracking-wider text-orange-900 bg-orange-200/80 px-2 py-0.5 rounded shadow-sm">
                          <Sparkles className="w-2.5 h-2.5 text-orange-700" />
                          {item.tag}
                        </span>
                      )}
                      <p className="text-neutral-600 text-xs leading-relaxed mt-1 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[#e5dbc9] flex items-center justify-between text-[10.5px] font-bold text-neutral-500 uppercase tracking-wider">
                <span className="text-orange-600 font-extrabold flex items-center gap-1">
                  Click Next to Flip <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span>Page {currentPage * 2 + 2}</span>
              </div>
            </div>
          </div>

          {/* ── REAL PHYSICAL 3D PAGE SHEET THAT TURNS OVER (1-BY-1 FLIP) ── */}
          {isFlipping && (
            <div
              className={`absolute top-0 bottom-0 right-0 w-1/2 z-40 ${
                flipDirection === "next" ? "animate-real-page-turn-next" : "animate-real-page-turn-prev"
              }`}
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
              }}
            >
              {/* FRONT FACE OF FLIPPING SHEET (Right Page Content) */}
              <div
                className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-l border-[#e3d8c5] shadow-xl"
                style={{
                  backfaceVisibility: "hidden",
                  background: "linear-gradient(to left, #f6f0e4 0%, #faf6ee 12%, #faf6ee 90%, #eee4d2 100%)",
                }}
              >
                <div>
                  <div className="border-b-2 border-amber-500/80 pb-3 mb-6 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                      {activeSpread.subtitle}
                    </span>
                    <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest border border-amber-300/60 px-2 py-0.5 rounded bg-amber-50/60">
                      Mixnosh
                    </span>
                  </div>
                  <div className="space-y-6">
                    {activeSpread.rightPage.map((item, i) => (
                      <div key={i}>
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-heading font-bold text-sm sm:text-base text-neutral-900 uppercase tracking-tight">
                            {item.name}
                          </h4>
                          <span className="font-heading font-black text-base sm:text-lg text-orange-600 shrink-0">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-neutral-600 text-xs leading-relaxed mt-1 font-medium">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Dynamic Lighting & Shadow Sweep on Front Face */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* BACK FACE OF FLIPPING SHEET (Next Left Page Content) */}
              <div
                className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-r border-[#e3d8c5] shadow-xl"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "linear-gradient(to right, #f6f0e4 0%, #faf6ee 12%, #faf6ee 90%, #eee4d2 100%)",
                }}
              >
                <div>
                  <div className="border-b-2 border-orange-500/80 pb-3 mb-6 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">
                      {nextSpread.category}
                    </span>
                    <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest border border-amber-300/60 px-2 py-0.5 rounded bg-amber-50/60">
                      Mixnosh
                    </span>
                  </div>
                  <div className="space-y-6">
                    {nextSpread.leftPage.map((item, i) => (
                      <div key={i}>
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-heading font-bold text-sm sm:text-base text-neutral-900 uppercase tracking-tight">
                            {item.name}
                          </h4>
                          <span className="font-heading font-black text-base sm:text-lg text-orange-600 shrink-0">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-neutral-600 text-xs leading-relaxed mt-1 font-medium">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Dynamic Lighting & Shadow Sweep on Back Face */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-black/10 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* ── BOTTOM CONTROLS ── */}
        <div className="mt-4 flex items-center justify-between text-xs text-amber-200/80 font-bold uppercase tracking-wider px-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0 || isFlipping}
            className="hover:text-amber-400 disabled:opacity-30 transition-colors flex items-center gap-1 cursor-pointer"
          >
            ← Previous Page
          </button>

          <span className="text-[10px] text-amber-300/60 font-semibold tracking-widest hidden sm:inline">
            ✦ Hardcover Leather Menu Book ✦
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1 || isFlipping}
            className="hover:text-amber-400 disabled:opacity-30 transition-colors flex items-center gap-1 cursor-pointer"
          >
            Next Page →
          </button>
        </div>
      </div>
    </div>
  );
}
