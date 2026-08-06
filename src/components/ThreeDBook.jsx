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

      {/* ── REALISTIC OPEN JOURNAL COVER & PAPER CONTAINER ── */}
      <div className="relative mx-auto rounded-3xl p-3 sm:p-5 md:p-6 bg-[#1a1816] border-2 border-[#36302a] shadow-[0_30px_70px_rgba(0,0,0,0.35)] transition-all duration-500">
        
        {/* Soft Ambient Table Surface Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-500/5 via-transparent to-black/50 pointer-events-none" />

        {/* Golden Satin Ribbon Bookmark Hanging From Bottom Spine */}
        <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 z-40 w-4 h-12 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 rounded-b-md shadow-lg border-x border-amber-300/40 pointer-events-none" />

        {/* ── OPEN CREAME-COLORED JOURNAL SPREAD ── */}
        <div
          className="relative rounded-2xl bg-[#faf6ee] shadow-[0_15px_35px_rgba(0,0,0,0.25)] min-h-[490px] sm:min-h-[530px] flex overflow-visible"
          style={{ perspective: "1800px", transformStyle: "preserve-3d" }}
        >

          {/* RIGHT SIDE STACKED PAGE BLOCK (REAL PHYSICAL PAPER THICKNESS) */}
          <div
            className="absolute top-1 bottom-1 right-[-14px] w-3.5 rounded-r-sm z-10 pointer-events-none shadow-md"
            style={{
              background: "repeating-linear-gradient(to bottom, #d6caa7, #d6caa7 2px, #f5efe2 2px, #f5efe2 5px)",
              boxShadow: "inset 2px 0 4px rgba(0,0,0,0.15), 3px 0 6px rgba(0,0,0,0.1)",
            }}
          />

          {/* LEFT SIDE STACKED PAGE BLOCK */}
          <div
            className="absolute top-1 bottom-1 left-[-14px] w-3.5 rounded-l-sm z-10 pointer-events-none shadow-md"
            style={{
              background: "repeating-linear-gradient(to bottom, #d6caa7, #d6caa7 2px, #f5efe2 2px, #f5efe2 5px)",
              boxShadow: "inset -2px 0 4px rgba(0,0,0,0.15), -3px 0 6px rgba(0,0,0,0.1)",
            }}
          />

          {/* Center Spine Crease Line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 bg-gradient-to-r from-black/20 via-black/5 to-black/20 z-30 pointer-events-none flex items-center justify-center">
            <div className="w-0.5 h-full bg-[#d6c7b0]" />
          </div>

          {/* ── MAIN SPREAD GRID ── */}
          <div className="relative w-full h-full min-h-[490px] sm:min-h-[530px] grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden">
            
            {/* LEFT PAGE */}
            <div
              className="p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e3d8c5] relative"
              style={{
                background: "linear-gradient(to right, #f2ebd9 0%, #faf6ee 10%, #faf6ee 90%, #e5dbc7 100%)",
                boxShadow: "inset 6px 0 18px rgba(0,0,0,0.03)",
              }}
            >
              <div>
                <div className="border-b-2 border-orange-500/80 pb-3 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">
                      Menu Category
                    </span>
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-neutral-900 uppercase tracking-tight">
                      {(isFlipping && flipDirection === "prev" ? prevSpread : activeSpread).category}
                    </h3>
                  </div>
                  <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest border border-amber-300/60 px-2 py-0.5 rounded bg-amber-50/60">
                    Mixnosh
                  </span>
                </div>

                <div className="space-y-6">
                  {(isFlipping && flipDirection === "prev" ? prevSpread : activeSpread).leftPage.map((item, i) => (
                    <div key={i} className="group flex gap-3 items-start">
                      {item.image && (
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-amber-200 shadow-sm mt-0.5">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      )}
                      <div className="flex-1">
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
                          <span className="inline-flex items-center gap-1 mt-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded shadow-sm">
                            <Sparkles className="w-2.5 h-2.5 text-amber-700" />
                            {item.tag}
                          </span>
                        )}
                        <p className="text-neutral-600 text-xs leading-relaxed mt-1 font-medium">
                          {item.desc}
                        </p>
                      </div>
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

            {/* RIGHT PAGE */}
            <div
              className="p-6 sm:p-8 md:p-10 flex flex-col justify-between relative"
              style={{
                background: "linear-gradient(to left, #f2ebd9 0%, #faf6ee 10%, #faf6ee 90%, #e5dbc7 100%)",
                boxShadow: "inset -6px 0 18px rgba(0,0,0,0.03)",
              }}
            >
              <div>
                <div className="border-b-2 border-amber-500/80 pb-3 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                      Chef Selection
                    </span>
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-neutral-900 uppercase tracking-tight">
                      {(isFlipping && flipDirection === "next" ? nextSpread : activeSpread).subtitle}
                    </h3>
                  </div>
                  <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest border border-amber-300/60 px-2 py-0.5 rounded bg-amber-50/60">
                    Mixnosh
                  </span>
                </div>

                <div className="space-y-6">
                  {(isFlipping && flipDirection === "next" ? nextSpread : activeSpread).rightPage.map((item, i) => (
                    <div key={i} className="group flex gap-3 items-start">
                      {item.image && (
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-amber-200 shadow-sm mt-0.5">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      )}
                      <div className="flex-1">
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
                          <span className="inline-flex items-center gap-1 mt-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-orange-900 bg-orange-200/80 px-2 py-0.5 rounded shadow-sm">
                            <Sparkles className="w-2.5 h-2.5 text-orange-700" />
                            {item.tag}
                          </span>
                        )}
                        <p className="text-neutral-600 text-xs leading-relaxed mt-1 font-medium">
                          {item.desc}
                        </p>
                      </div>
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

          {/* ── PHYSICAL 3D PAGE SHEET THAT FLIPS OVER (1-BY-1 FLIP) ── */}
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
              {/* FRONT FACE OF FLIPPING SHEET */}
              <div
                className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-l border-[#e3d8c5] shadow-2xl overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  background: "linear-gradient(to left, #f2ebd9 0%, #faf6ee 10%, #faf6ee 90%, #e5dbc7 100%)",
                }}
              >
                <div>
                  <div className="border-b-2 border-amber-500/80 pb-3 mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                        Chef Selection
                      </span>
                      <h3 className="font-heading font-black text-xl sm:text-2xl text-neutral-900 uppercase tracking-tight">
                        {activeSpread.subtitle}
                      </h3>
                    </div>
                    <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest border border-amber-300/60 px-2 py-0.5 rounded bg-amber-50/60">
                      Mixnosh
                    </span>
                  </div>
                  <div className="space-y-6">
                    {activeSpread.rightPage.map((item, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        {item.image && (
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-amber-200 shadow-sm mt-0.5">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
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
                      </div>
                    ))}
                  </div>
                </div>
                {/* Dynamic Lighting & Page Shadow Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* BACK FACE OF FLIPPING SHEET */}
              <div
                className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-r border-[#e3d8c5] shadow-2xl overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "linear-gradient(to right, #f2ebd9 0%, #faf6ee 10%, #faf6ee 90%, #e5dbc7 100%)",
                }}
              >
                <div>
                  <div className="border-b-2 border-orange-500/80 pb-3 mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">
                        Menu Category
                      </span>
                      <h3 className="font-heading font-black text-xl sm:text-2xl text-neutral-900 uppercase tracking-tight">
                        {nextSpread.category}
                      </h3>
                    </div>
                    <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest border border-amber-300/60 px-2 py-0.5 rounded bg-amber-50/60">
                      Mixnosh
                    </span>
                  </div>
                  <div className="space-y-6">
                    {nextSpread.leftPage.map((item, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        {item.image && (
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-amber-200 shadow-sm mt-0.5">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
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
                      </div>
                    ))}
                  </div>
                </div>
                {/* Dynamic Lighting & Page Shadow Sweep */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-black/10 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* ── BOTTOM CONTROLS ── */}
        <div className="mt-5 flex items-center justify-between text-xs text-amber-200/80 font-bold uppercase tracking-wider px-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0 || isFlipping}
            className="hover:text-amber-400 disabled:opacity-30 transition-colors flex items-center gap-1 cursor-pointer"
          >
            ← Previous Page
          </button>

          <span className="text-[10px] text-amber-300/60 font-semibold tracking-widest hidden sm:inline">
            ✦ Hardcover Leather Menu Journal ✦
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
