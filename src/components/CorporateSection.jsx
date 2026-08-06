import React from "react";
import {
  Building2,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const CLIENT_LOGOS = [
  { name: "Google", url: "https://admin.mixnosh.in/logos/Google_2015_logo.svg.webp" },
  { name: "Shell", url: "https://admin.mixnosh.in/logos/Shell.png" },
  { name: "TISB", url: "https://admin.mixnosh.in/logos/TISB.jpeg" },
  { name: "MoEngage", url: "https://admin.mixnosh.in/logos/moengage.png" },
  { name: "Innominds", url: "https://admin.mixnosh.in/logos/images__1_-removebg-preview.png" },
  { name: "Adobe", url: "https://admin.mixnosh.in/logos/1200px-Adobe_Corporate_Logo.png" },
  { name: "LinkedIn", url: "https://admin.mixnosh.in/logos/Linkedin-logo-blue-png-large-size.png" },
  { name: "Aantrik", url: "https://admin.mixnosh.in/logos/659b97f734f8cfe5327fd196_aantrik logo .png" },
  { name: "Client", url: "https://admin.mixnosh.in/logos/cropped-logo-web-1.webp" },
];

const BENEFITS = [
  {
    icon: Sparkles,
    color: "bg-orange-500/10 border-orange-500/20 text-orange-600",
    title: "Custom Art Workshops",
    desc: "Sneaker painting, resin art, canvas painting, or tote customization — perfect for all skill levels.",
  },
  {
    icon: Users,
    color: "bg-amber-500/10 border-amber-500/20 text-amber-600",
    title: "Private Cafe Hosting",
    desc: "Reserve entire floors at HSR Layout or Jayanagar for private team sessions (10–60+ guests).",
  },
  {
    icon: ShieldCheck,
    color: "bg-orange-500/10 border-orange-500/20 text-orange-500",
    title: "Tailored Food & Beverage",
    desc: "Customized menus, artisanal coffees, mocktails, and decadent dessert platters.",
  },
];

export default function CorporateSection({ onOpenBooking }) {
  return (
    <section
      id="corporate"
      className="py-16 lg:py-20 relative overflow-hidden text-neutral-900 border-t border-orange-200/50 select-none"
    >
      {/* Glow accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

        {/* ── TWO-COLUMN: LEFT = content, RIGHT = orbit ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-10">

          {/* LEFT — Header + Benefits + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Badge + Title */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-orange-100/90 text-orange-600 rounded-full font-extrabold text-xs uppercase tracking-wider border border-orange-200">
                <Building2 className="w-4 h-4 text-orange-500" /> Team Building &amp; Offsites
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter uppercase text-neutral-900 leading-tight">
                Corporate Events &amp;{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
                  Team Parties
                </span>
              </h2>
              <p className="text-neutral-600 text-base leading-relaxed font-medium max-w-md">
                Host your next corporate event, team offsite, or private celebration in a vibrant, inspiring setting. Spark creativity and strengthen team bonds.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                    className="flex items-start gap-4 p-4 bg-white/80 border border-orange-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${b.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm text-neutral-900 uppercase tracking-tight mb-0.5">{b.title}</h3>
                      <p className="text-neutral-500 text-xs leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onOpenBooking("corporate")}
              className="px-7 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-heading font-black uppercase tracking-wider text-sm rounded-full shadow-lg shadow-orange-500/25 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              Request Proposal <ArrowRight className="w-4 h-4 text-amber-200" />
            </motion.button>
          </motion.div>

          {/* RIGHT — Orbit Circle */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center w-full"
          >
            <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4 sm:mb-6 text-center">
              Trusted by World-Class Organizations
            </p>

            {/* Spacious Circular Orbit Container */}
            <div className="relative w-[300px] xs:w-[340px] sm:w-[480px] lg:w-[540px] xl:w-[580px] aspect-square flex items-center justify-center overflow-visible my-4">

              {/* Outer Orbit Guide Ring */}
              <div className="absolute inset-[9%] rounded-full border border-dashed border-orange-200/80 pointer-events-none" />

              {/* Center Glow */}
              <div className="absolute inset-[32%] rounded-full bg-gradient-to-br from-orange-100/90 via-amber-50/80 to-orange-50/50 shadow-inner" />

              {/* Center Label Badge */}
              <div className="absolute w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-white shadow-xl flex flex-col items-center justify-center border-2 border-orange-200/90 z-20 text-center p-2">
                <span className="text-orange-600 font-black font-heading text-[10px] sm:text-xs lg:text-sm uppercase tracking-widest leading-tight">
                  Trusted<br />Partners
                </span>
              </div>

              {/* Circular Orbiting Logos */}
              <div className="absolute inset-0 animate-orbit rounded-full">
                {CLIENT_LOGOS.map((client, idx) => {
                  const angle = (360 / CLIENT_LOGOS.length) * idx;
                  return (
                    <div
                      key={idx}
                      className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 -ml-6 -mt-6 sm:-ml-8 sm:-mt-8 lg:-ml-9 lg:-mt-9"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-41%) rotate(-${angle}deg)`,
                      }}
                    >
                      <div className="w-full h-full bg-white rounded-full p-2 sm:p-2.5 shadow-md flex items-center justify-center animate-reverse-orbit border border-orange-200/80 hover:scale-115 transition-transform cursor-pointer shadow-orange-500/10">
                        <img
                          src={client.url}
                          alt={client.name}
                          className="max-h-full max-w-full object-contain mix-blend-multiply"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
