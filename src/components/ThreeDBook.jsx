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
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-6 px-1 sm:px-4 select-none">
      {/* ── TOP CATEGORY NAVIGATION TABS ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-6">
        <div className="flex overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap gap-1.5 sm:gap-2 pb-1 sm:pb-0 -mx-1 px-1">
          {pages.map((page, idx) => (
            <button
              key={idx}
              onClick={() => handleTabClick(idx)}
              className={`shrink-0 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1 sm:gap-1.5 shadow-sm ${
                currentPage === idx
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/25 scale-105"
                  : "bg-white/90 text-neutral-700 hover:bg-orange-50 border border-orange-200"
              }`}
            >
              <Bookmark className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {page.category}
            </button>
          ))}
        </div>

        {/* Page counter & Navigation buttons */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0 || isFlipping}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-orange-200 text-neutral-800 flex items-center justify-center hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-600 px-1 sm:px-2">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1 || isFlipping}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-orange-200 text-neutral-800 flex items-center justify-center hover:bg-orange-50 disabled:opacity-40 transition-all shadow-sm cursor-pointer`}
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* ── REALISTIC 3D HARDCOVER BOOK CASING ── */}
      <div className="relative">

        <div
          className="relative mx-auto rounded-xl sm:rounded-2xl bg-[#1e1410] border-2 border-[#3d2e24] transition-all duration-500"
          style={{
            perspective: "2000px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,200,100,0.06)"
          }}
        >
          {/* Leather texture highlight */}
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-b from-amber-800/8 via-transparent to-black/55 pointer-events-none" />

          {/* ── THIN PAGE-EDGE BARS — left and right side ── */}
          <div
            className="absolute left-1 sm:left-2 top-2 sm:top-4 bottom-2 sm:bottom-4 z-10 pointer-events-none rounded-sm"
            style={{
              width: "4px",
              background: "repeating-linear-gradient(to bottom, #b8a87a 0px, #b8a87a 1.2px, #ede0c4 1.2px, #ede0c4 3.5px)",
              boxShadow: "inset 1px 0 3px rgba(0,0,0,0.22)",
              opacity: 0.9,
            }}
          />
          <div
            className="absolute right-1 sm:right-2 top-2 sm:top-4 bottom-2 sm:bottom-4 z-10 pointer-events-none rounded-sm"
            style={{
              width: "4px",
              background: "repeating-linear-gradient(to bottom, #b8a87a 0px, #b8a87a 1.2px, #ede0c4 1.2px, #ede0c4 3.5px)",
              boxShadow: "inset -1px 0 3px rgba(0,0,0,0.22)",
              opacity: 0.9,
            }}
          />

          {/* Inner page area margin */}
          <div className="relative rounded-lg sm:rounded-xl mx-2 sm:mx-4 my-2 sm:my-3 bg-[#17110d] border-y border-[#4a382c]/50 shadow-inner overflow-hidden">

          {/* ── OPEN BOOK SPREAD ── */}
          <div
            className="relative min-h-[420px] sm:min-h-[500px] md:min-h-[540px] flex overflow-visible"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Center Spine Gutter */}
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
              style={{
                width: "28px",
                background: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.28) 30%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.28) 70%, transparent 100%)",
              }}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
                style={{ background: "rgba(30,15,5,0.55)" }}
              />
            </div>

            {/* ── SPREAD GRID (ALWAYS 2 COLUMNS FOR REAL BOOK SPREAD) ── */}
            <div className="relative w-full h-full min-h-[420px] sm:min-h-[500px] md:min-h-[540px] grid grid-cols-2 overflow-hidden rounded-lg">
              
              {/* LEFT PAGE */}
              <div
                className="p-3 sm:p-6 md:p-10 flex flex-col justify-between relative rounded-l-md border-r border-[#dfd4c2]"
                style={{
                  background: "linear-gradient(to right, #e8d8b2 0%, #faf6ee 8%, #faf6ee 80%, #e8d8b2 100%)",
                  boxShadow: "inset -16px 0 24px -10px rgba(0,0,0,0.20), inset 2px 0 8px rgba(0,0,0,0.05)",
                }}
              >
                <div>
                  <div className="border-b sm:border-b-2 border-orange-500/80 pb-1.5 sm:pb-3 mb-3 sm:mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-orange-600 block">
                        Category
                      </span>
                      <h3 className="font-heading font-black text-xs sm:text-xl md:text-2xl text-neutral-900 uppercase tracking-tight truncate max-w-[110px] sm:max-w-none">
                        {(isFlipping && flipDirection === "prev" ? prevSpread : activeSpread).category}
                      </h3>
                    </div>
                    <span className="text-[7.5px] sm:text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest border border-amber-300/60 px-1 sm:px-2 py-0.5 rounded bg-amber-50/60 hidden sm:inline">
                      Mixnosh
                    </span>
                  </div>

                  <div className="space-y-3 sm:space-y-5 md:space-y-6">
                    {(isFlipping && flipDirection === "prev" ? prevSpread : activeSpread).leftPage.map((item, i) => (
                      <div key={i} className="group flex gap-1.5 sm:gap-3.5 items-start">
                        {item.image && (
                          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-amber-200/90 shadow-sm mt-0.5">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-1">
                            <h4 className="font-heading font-bold text-[11px] sm:text-sm md:text-base text-neutral-900 uppercase tracking-tight truncate group-hover:text-orange-600 transition-colors">
                              {item.name}
                            </h4>
                            <span className="font-heading font-black text-xs sm:text-base md:text-lg text-orange-600 shrink-0">
                              {item.price}
                            </span>
                          </div>
                          {item.tag && (
                            <span className="inline-flex items-center gap-0.5 mt-0.5 text-[7.5px] sm:text-[9.5px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-1 sm:px-2 py-0.5 rounded shadow-sm">
                              <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-amber-700 hidden sm:inline" />
                              {item.tag}
                            </span>
                          )}
                          <p className="text-neutral-600 text-[9.5px] sm:text-xs leading-tight sm:leading-relaxed mt-0.5 sm:mt-1 font-medium line-clamp-2 sm:line-clamp-none">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 sm:pt-4 mt-3 sm:mt-6 border-t border-[#e5dbc9] flex items-center justify-between text-[8px] sm:text-[10.5px] font-bold text-neutral-500 uppercase tracking-wider">
                  <span className="truncate">{activeLocation === "hsr" ? "HSR Layout" : "Jayanagar"}</span>
                  <span className="text-orange-600 flex items-center gap-0.5 font-extrabold shrink-0">
                    <Utensils className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-500" /> Fresh
                  </span>
                </div>
              </div>

              {/* RIGHT PAGE */}
              <div
                className="p-3 sm:p-6 md:p-10 flex flex-col justify-between relative rounded-r-md"
                style={{
                  background: "linear-gradient(to left, #e8d8b2 0%, #faf6ee 8%, #faf6ee 80%, #e8d8b2 100%)",
                  boxShadow: "inset 16px 0 24px -10px rgba(0,0,0,0.20), inset -2px 0 8px rgba(0,0,0,0.05)",
                }}
              >
                <div>
                  <div className="border-b sm:border-b-2 border-amber-500/80 pb-1.5 sm:pb-3 mb-3 sm:mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-amber-600 block">
                        Selection
                      </span>
                      <h3 className="font-heading font-black text-xs sm:text-xl md:text-2xl text-neutral-900 uppercase tracking-tight truncate max-w-[110px] sm:max-w-none">
                        {(isFlipping && flipDirection === "next" ? nextSpread : activeSpread).subtitle}
                      </h3>
                    </div>
                    <span className="text-[7.5px] sm:text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest border border-amber-300/60 px-1 sm:px-2 py-0.5 rounded bg-amber-50/60 hidden sm:inline">
                      Mixnosh
                    </span>
                  </div>

                  <div className="space-y-3 sm:space-y-5 md:space-y-6">
                    {(isFlipping && flipDirection === "next" ? nextSpread : activeSpread).rightPage.map((item, i) => (
                      <div key={i} className="group flex gap-1.5 sm:gap-3.5 items-start">
                        {item.image && (
                          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-amber-200/90 shadow-sm mt-0.5">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-1">
                            <h4 className="font-heading font-bold text-[11px] sm:text-sm md:text-base text-neutral-900 uppercase tracking-tight truncate group-hover:text-orange-600 transition-colors">
                              {item.name}
                            </h4>
                            <span className="font-heading font-black text-xs sm:text-base md:text-lg text-orange-600 shrink-0">
                              {item.price}
                            </span>
                          </div>
                          {item.tag && (
                            <span className="inline-flex items-center gap-0.5 mt-0.5 text-[7.5px] sm:text-[9.5px] font-extrabold uppercase tracking-wider text-orange-900 bg-orange-200/80 px-1 sm:px-2 py-0.5 rounded shadow-sm">
                              <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-orange-700 hidden sm:inline" />
                              {item.tag}
                            </span>
                          )}
                          <p className="text-neutral-600 text-[9.5px] sm:text-xs leading-tight sm:leading-relaxed mt-0.5 sm:mt-1 font-medium line-clamp-2 sm:line-clamp-none">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 sm:pt-4 mt-3 sm:mt-6 border-t border-[#e5dbc9] flex items-center justify-between text-[8px] sm:text-[10.5px] font-bold text-neutral-500 uppercase tracking-wider">
                  <span className="text-orange-600 font-extrabold flex items-center gap-0.5 shrink-0">
                    Next <ChevronRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </span>
                  <span>Pg {currentPage * 2 + 2}</span>
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
                  className="absolute inset-0 p-3 sm:p-6 md:p-10 flex flex-col justify-between border-l border-[#e3d8c5] shadow-2xl overflow-hidden rounded-r-md"
                  style={{
                    backfaceVisibility: "hidden",
                    background: "linear-gradient(to left, #eddcb9 0%, #faf6ee 6%, #faf6ee 88%, #e2d3b9 100%)",
                  }}
                >
                  <div>
                    <div className="border-b sm:border-b-2 border-amber-500/80 pb-1.5 sm:pb-3 mb-3 sm:mb-6 flex items-center justify-between">
                      <div>
                        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-amber-600 block">
                          Selection
                        </span>
                        <h3 className="font-heading font-black text-xs sm:text-xl md:text-2xl text-neutral-900 uppercase tracking-tight truncate">
                          {activeSpread.subtitle}
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-5 md:space-y-6">
                      {activeSpread.rightPage.map((item, i) => (
                        <div key={i} className="flex gap-1.5 sm:gap-3.5 items-start">
                          {item.image && (
                            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-amber-200/90 shadow-sm mt-0.5">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-1">
                              <h4 className="font-heading font-bold text-[11px] sm:text-sm md:text-base text-neutral-900 uppercase tracking-tight truncate">
                                {item.name}
                              </h4>
                              <span className="font-heading font-black text-xs sm:text-base md:text-lg text-orange-600 shrink-0">
                                {item.price}
                              </span>
                            </div>
                            <p className="text-neutral-600 text-[9.5px] sm:text-xs leading-tight sm:leading-relaxed mt-0.5 sm:mt-1 font-medium line-clamp-2 sm:line-clamp-none">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Dynamic Lighting & Page Shadow Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/15 pointer-events-none" />
                </div>

                {/* BACK FACE OF FLIPPING SHEET */}
                <div
                  className="absolute inset-0 p-3 sm:p-6 md:p-10 flex flex-col justify-between border-r border-[#e3d8c5] shadow-2xl overflow-hidden rounded-l-md"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "linear-gradient(to right, #eddcb9 0%, #faf6ee 6%, #faf6ee 88%, #e2d3b9 100%)",
                  }}
                >
                  <div>
                    <div className="border-b sm:border-b-2 border-orange-500/80 pb-1.5 sm:pb-3 mb-3 sm:mb-6 flex items-center justify-between">
                      <div>
                        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-orange-600 block">
                          Category
                        </span>
                        <h3 className="font-heading font-black text-xs sm:text-xl md:text-2xl text-neutral-900 uppercase tracking-tight truncate">
                          {nextSpread.category}
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-5 md:space-y-6">
                      {nextSpread.leftPage.map((item, i) => (
                        <div key={i} className="flex gap-1.5 sm:gap-3.5 items-start">
                          {item.image && (
                            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-amber-200/90 shadow-sm mt-0.5">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-1">
                              <h4 className="font-heading font-bold text-[11px] sm:text-sm md:text-base text-neutral-900 uppercase tracking-tight truncate">
                                {item.name}
                              </h4>
                              <span className="font-heading font-black text-xs sm:text-base md:text-lg text-orange-600 shrink-0">
                                {item.price}
                              </span>
                            </div>
                            <p className="text-neutral-600 text-[9.5px] sm:text-xs leading-tight sm:leading-relaxed mt-0.5 sm:mt-1 font-medium line-clamp-2 sm:line-clamp-none">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Dynamic Lighting & Page Shadow Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-transparent to-black/15 pointer-events-none" />
                </div>
              </div>
            )}
          </div>
          </div>
        </div>

        {/* ── BOTTOM JOURNAL CONTROLS ── */}
        <div className="mt-4 sm:mt-8 flex items-center justify-between px-1 sm:px-0">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0 || isFlipping}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#1e1410] border border-amber-800/40 text-amber-300/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-amber-900/40 hover:text-amber-200 disabled:opacity-30 transition-all shadow-md cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Prev
          </button>

          <span className="text-[10px] text-amber-700/70 font-semibold tracking-widest hidden sm:inline">
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1 || isFlipping}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#1e1410] border border-amber-800/40 text-amber-300/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-amber-900/40 hover:text-amber-200 disabled:opacity-30 transition-all shadow-md cursor-pointer"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
