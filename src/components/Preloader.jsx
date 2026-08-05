import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── 100% Crisp Vector Circle Icons (Cutout Cutlery touches bottom of circle) ── */

function RedForkCircle() {
  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 relative flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Flat Red Circle */}
        <circle cx="50" cy="50" r="50" fill="#f74352" />

        {/* White Fork */}
        {/* 4 Tines */}
        <rect x="34" y="16" width="5" height="28" rx="2.5" fill="white" />
        <rect x="43" y="16" width="5" height="28" rx="2.5" fill="white" />
        <rect x="52" y="16" width="5" height="28" rx="2.5" fill="white" />
        <rect x="61" y="16" width="5" height="28" rx="2.5" fill="white" />

        {/* Fork Shoulder */}
        <path d="M34 40 h32 v10 a4 4 0 0 1 -4 4 h-24 a4 4 0 0 1 -4 -4 Z" fill="white" />

        {/* Fork Handle extending to bottom edge */}
        <rect x="45" y="52" width="10" height="48" fill="white" />
      </svg>
    </div>
  );
}

function YellowKnifeCircle() {
  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 relative flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Flat Yellow Circle */}
        <circle cx="50" cy="50" r="50" fill="#ffd13b" />

        {/* White Knife */}
        {/* Blade: straight spine on left, curved cutting edge on right */}
        <path
          d="M 44 16 L 49 16 C 58 24 58 44 54 52 L 44 54 Z"
          fill="white"
        />

        {/* Handle extending to bottom edge */}
        <rect x="44" y="53" width="9" height="47" fill="white" />
      </svg>
    </div>
  );
}

function CyanSpoonCircle() {
  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 relative flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Flat Cyan Circle */}
        <circle cx="50" cy="50" r="50" fill="#36d7eb" />

        {/* White Spoon Bowl */}
        <ellipse cx="50" cy="34" rx="16" ry="20" fill="white" />

        {/* Spoon Handle extending to bottom edge */}
        <rect x="45" y="50" width="10" height="50" fill="white" />
      </svg>
    </div>
  );
}

export default function Preloader({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Step 1: MIXNOSH logo appears in center
    const t1 = setTimeout(() => setStep(1), 150);

    // Step 2: 1st circle (Red Fork) pops up
    const t2 = setTimeout(() => setStep(2), 650);

    // Step 3: 2nd circle (Yellow Knife) pops up
    const t3 = setTimeout(() => setStep(3), 1050);

    // Step 4: 3rd circle (Cyan Spoon) pops up
    const t4 = setTimeout(() => setStep(4), 1450);

    // Step 5: Finish preloader & reveal website
    const t5 = setTimeout(() => {
      setStep(5);
      if (onComplete) onComplete();
    }, 2900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const circleSpring = { type: "spring", stiffness: 450, damping: 22 };
  const circleInit = { opacity: 0, scale: 0, y: -18 };
  const circleAnim = { opacity: 1, scale: 1, y: 0 };

  return (
    <AnimatePresence>
      {step < 5 && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center select-none overflow-hidden"
        >
          <div className="relative z-10 flex flex-col items-center justify-center text-center">

            {/* THREE VECTOR LOGO CIRCLES POPPING UP ONE BY ONE */}
            <div className="h-20 sm:h-24 lg:h-26 flex items-center justify-center gap-4 sm:gap-6 mb-4">
              {/* 1. Red Fork Circle */}
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div
                    key="fork-circle"
                    initial={circleInit}
                    animate={circleAnim}
                    transition={circleSpring}
                  >
                    <RedForkCircle />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 2. Yellow Knife Circle */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div
                    key="knife-circle"
                    initial={circleInit}
                    animate={circleAnim}
                    transition={circleSpring}
                  >
                    <YellowKnifeCircle />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3. Cyan Spoon Circle */}
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div
                    key="spoon-circle"
                    initial={circleInit}
                    animate={circleAnim}
                    transition={circleSpring}
                  >
                    <CyanSpoonCircle />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* OFFICIAL DISTRESSED MIXNOSH LOGO TEXT & TAGLINE */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  key="mixnosh-brand"
                  initial={{ opacity: 0, y: 14, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  <img
                    src="/mixnosh-text.png"
                    alt="MIXNOSH"
                    className="h-12 sm:h-16 md:h-20 w-auto object-contain block"
                  />
                  <span className="text-neutral-700 text-xs sm:text-sm font-semibold tracking-wide mt-2">
                    #Where Food, Art &amp; Sneakers Unite!!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
