import React from "react";
import { Palette, MapPin, Phone, ArrowUp, Heart, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer({ setCurrentView, onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white text-neutral-600 pt-12 pb-6 text-left relative overflow-hidden border-t border-orange-200/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-orange-200/60">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src="https://mixnosh.in/newmix/assets/img/logo.svg" alt="Mixnosh Logo" className="h-full w-auto object-contain" />
                </div>
              <span className="font-heading font-black text-2xl tracking-tighter text-neutral-900">
                MIXNOSH<span className="text-orange-600">.</span>
              </span>
            </div>

            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
              India's First Sneaker & Resin Art Cafe. Where great food meets
              creative freedom — paint, customize, and unwind in Bengaluru's
              most unique underground cafe.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/mixnosh?igsh=cmlqZjFrNmhreTNj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-md shadow-rose-500/25 hover:scale-110 transition-transform flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61574771342574"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1877F2] text-white shadow-md shadow-blue-500/25 hover:scale-110 transition-transform flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/mixnosh-art-cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0A66C2] text-white shadow-md shadow-blue-600/25 hover:scale-110 transition-transform flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3 text-sm">
            <span className="font-heading font-bold text-neutral-900 text-base block mb-1 uppercase tracking-wider">
              Explore Mixnosh
            </span>
            <ul className="space-y-2.5 text-neutral-600 font-semibold">
              <li>
                <button
                  onClick={() => setCurrentView("home")}
                  className="hover:text-orange-600 transition-colors cursor-pointer uppercase tracking-wider text-xs"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("workshops")}
                  className="hover:text-orange-600 transition-colors cursor-pointer uppercase tracking-wider text-xs"
                >
                  Workshops & Events
                </button>
              </li>
              <li>
                <a
                  href="#dine"
                  className="hover:text-orange-600 transition-colors uppercase tracking-wider text-xs"
                >
                  Dine & Menu
                </a>
              </li>
              <li>
                <a
                  href="#corporate"
                  className="hover:text-orange-600 transition-colors uppercase tracking-wider text-xs"
                >
                  Corporate Events
                </a>
              </li>
              <li>
                <a
                  href="#bookclub"
                  className="hover:text-orange-600 transition-colors uppercase tracking-wider text-xs"
                >
                  Book Club
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking("workshop")}
                  className="hover:text-orange-600 transition-colors cursor-pointer uppercase tracking-wider text-xs"
                >
                  Book Online
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Information & Locations */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            <span className="font-heading font-bold text-neutral-900 text-base block mb-1 uppercase tracking-wider">
              Location & Contact Info
            </span>

            {/* HSR Layout */}
            <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200/80 space-y-1.5 shadow-sm">
              <span className="font-extrabold text-orange-600 block text-xs uppercase tracking-wider">
                HSR Layout Branch
              </span>
              <p className="text-neutral-600 flex items-start gap-2 font-medium">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                <span>
                  1919, 21st Main Road, 25th Cross, Sector 2, HSR, Bengaluru
                </span>
              </p>
              <p className="text-neutral-500 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <a
                  href="tel:+916364330840"
                  className="hover:text-neutral-900 font-bold transition-colors"
                >
                  +91 6364330840
                </a>
                <span>/</span>
                <a
                  href="tel:+916364330860"
                  className="hover:text-neutral-900 font-bold transition-colors"
                >
                  +91 6364330860
                </a>
              </p>
            </div>

            {/* Jayanagar */}
            <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200/80 space-y-1.5 shadow-sm">
              <span className="font-extrabold text-amber-600 block text-xs uppercase tracking-wider">
                Jayanagar Branch
              </span>
              <p className="text-neutral-600 flex items-start gap-2 font-medium">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                <span>
                  Ground Floor, 13th Cross, 732, 36th Cross Rd, 7th Block,
                  Jayanagar, Bengaluru
                </span>
              </p>
              <p className="text-neutral-500 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <a
                  href="tel:+919900018115"
                  className="hover:text-neutral-900 font-bold transition-colors"
                >
                  +91 99000 18115
                </a>
              </p>
            </div>

            {/* General Enquiries */}
            <div className="bg-white/80 p-3 rounded-2xl border border-orange-200/60 mt-2 shadow-sm">
              <p className="text-neutral-600 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-500" />
                <span className="font-extrabold text-neutral-800 uppercase text-[10px] tracking-widest">
                  Email:
                </span>
                <a
                  href="mailto:mixnosharts@gmail.com"
                  className="hover:text-orange-600 font-bold transition-colors text-xs"
                >
                  mixnosharts@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 uppercase tracking-widest font-bold">
          <p>© 2026 MIXNOSH ART CAFE / EOSCO BUSINESS SOLUTIONS LLP.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-900 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-neutral-900 transition-colors">
              Terms
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 px-4 rounded-full bg-orange-50 hover:bg-orange-500 hover:text-white text-neutral-700 transition-all cursor-pointer border border-orange-200 flex items-center gap-1.5 font-extrabold text-[11px] shadow-sm"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" /> Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

