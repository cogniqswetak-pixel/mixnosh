import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Utensils,
  Building2,
  CheckCircle2,
  Sparkles,
  MapPin,
  Phone,
  User,
  Mail,
  Clock,
  Users,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingModal({
  isOpen,
  onClose,
  initialType = "workshop",
  initialSelectedTitle = "",
}) {
  const [activeTab, setActiveTab] = useState(initialType);
  const [location, setLocation] = useState("HSR Bengaluru");
  const [workshopName, setWorkshopName] = useState(
    initialSelectedTitle || "SneakerArt Workshop",
  );
  const [date, setDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [guests, setGuests] = useState("2");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Corporate-specific
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [eventType, setEventType] = useState("");
  const [expType, setExpType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setActiveTab(initialType);
    if (initialSelectedTitle) {
      setWorkshopName(initialSelectedTitle);
    }
    setSubmitted(false);
  }, [initialType, initialSelectedTitle, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const inputCls =
    "w-full px-3.5 py-3 rounded-xl border border-neutral-200 text-neutral-900 text-sm font-medium focus:outline-none focus:border-orange-500 bg-neutral-50 placeholder:text-neutral-400";
  const labelCls =
    "block text-[10px] font-extrabold text-neutral-500 uppercase tracking-widest mb-1.5";
  const selectCls =
    "w-full px-3.5 py-3 rounded-xl border border-neutral-200 text-neutral-900 text-sm font-semibold focus:outline-none focus:border-orange-500 bg-neutral-50";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-orange-200/80 relative text-left max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Header */}
                <div className="mb-5 pr-10">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-orange-600">
                    Mixnosh Art Cafe Booking
                  </span>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 mt-1 uppercase tracking-tight">
                    {activeTab === "workshop" && "Book an Art Workshop"}
                    {activeTab === "table" && "Reserve a Table"}
                    {activeTab === "corporate" && "Enquire Now"}
                  </h2>
                </div>

                {/* Type Selector Tabs */}
                <div className="flex bg-neutral-100/80 p-1.5 rounded-2xl mb-6 border border-neutral-200/60">
                  {[
                    { key: "workshop", label: "Workshop", Icon: Calendar },
                    { key: "table", label: "Table", Icon: Utensils },
                    { key: "corporate", label: "Corporate", Icon: Building2 },
                  ].map(({ key, label, Icon }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveTab(key)}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        activeTab === key
                          ? "bg-white text-orange-600 shadow-sm font-extrabold"
                          : "text-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" /> {label}
                    </button>
                  ))}
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* — WORKSHOP TAB — */}
                  {activeTab === "workshop" && (
                    <>
                      <div>
                        <label className={labelCls}>Select Workshop</label>
                        <select
                          value={workshopName}
                          onChange={(e) => setWorkshopName(e.target.value)}
                          className={selectCls}
                        >
                          <option value="Beadazzled Canvas Workshop">Beadazzled Canvas Workshop — ₹1,838 | 07-08-2026 | Jayanagar</option>
                          <option value="Resin Luxury Ocean Lamp / Clock">Resin Luxury Ocean Lamp / Clock — ₹3,950 | 09-08-2026 | HSR</option>
                          <option value="SneakerArt Workshop (09 Aug, Jayanagar)">SneakerArt Workshop — ₹3,780 | 09-08-2026 | Jayanagar</option>
                          <option value="Luxurious Resin Name Plate 12&quot;">Luxurious Resin Name Plate 12" — ₹3,950 | 23-08-2026 | Jayanagar</option>
                          <option value="SneakerArt Workshop (23 Aug, HSR)">SneakerArt Workshop — ₹3,780 | 23-08-2026 | HSR</option>
                        </select>
                      </div>
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-xs text-neutral-600 font-semibold">
                        💳 You will be redirected to Razorpay to complete your payment securely after confirming.
                      </div>
                    </>
                  )}

                  {/* Common: Name + Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          placeholder="Name *"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className={`${inputCls} pl-10`}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Email</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          placeholder="Email *"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`${inputCls} pl-10`}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone + Guests */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          placeholder="Phone *"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`${inputCls} pl-10`}
                          maxLength={11}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>
                        {activeTab === "workshop" ? "No. of Painters" : activeTab === "corporate" ? "No. of Persons (max 20)" : "No. of Persons (max 10)"}
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                        <input
                          type="number"
                          placeholder="No. of Persons *"
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          min={1}
                          max={activeTab === "corporate" ? 20 : 10}
                          className={`${inputCls} pl-10`}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Booking Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={selectCls}
                        required
                      />
                    </div>

                    {/* Table: Time slot | Corporate: From Time */}
                    {activeTab === "table" && (
                      <div>
                        <label className={labelCls}>Booking Time</label>
                        <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} className={selectCls}>
                          <option value="">Select Time</option>
                          {["10AM - 11AM","11AM - 12PM","12PM - 1PM","1PM - 2PM","2PM - 3PM","3PM - 4PM","4PM - 5PM","5PM - 6PM","6PM - 7PM","7PM - 8PM","8PM - 9PM","9PM - 10PM"].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {activeTab === "corporate" && (
                      <div>
                        <label className={labelCls}>Experience Type</label>
                        <select value={expType} onChange={(e) => setExpType(e.target.value)} className={selectCls}>
                          <option value="">Select Type</option>
                          <option value="Sneaker Art Workshop">Sneaker Art Workshop</option>
                          <option value="Resin Art Workshop">Resin Art Workshop</option>
                          <option value="DIY">DIY</option>
                          <option value="Others - Include in message">Others — Include in message</option>
                        </select>
                      </div>
                    )}

                    {activeTab === "workshop" && (
                      <div>
                        <label className={labelCls}>Location</label>
                        <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectCls}>
                          <option value="HSR Bengaluru">HSR Bengaluru</option>
                          <option value="Jayanagar Bengaluru">Jayanagar Bengaluru</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Table: Purpose + Location */}
                  {activeTab === "table" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Purpose</label>
                        <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className={selectCls}>
                          <option value="">Select Purpose</option>
                          <option value="DIY Art">DIY Art</option>
                          <option value="Dine In">Dine In</option>
                          <option value="Book Club">Book Club</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Location</label>
                        <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectCls} required>
                          <option value="">Select Location</option>
                          <option value="HSR Bengaluru">HSR Bengaluru</option>
                          <option value="Jayanagar Bengaluru">Jayanagar Bengaluru</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Corporate: From/To Time + Company + Event Type + Location + Message */}
                  {activeTab === "corporate" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>From (Time)</label>
                          <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} className={selectCls} required />
                        </div>
                        <div>
                          <label className={labelCls}>To (Time)</label>
                          <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} className={selectCls} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Company Name</label>
                          <div className="relative">
                            <Briefcase className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                            <input
                              type="text"
                              placeholder="Company Name *"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              className={`${inputCls} pl-10`}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className={labelCls}>Event Related To</label>
                          <select value={eventType} onChange={(e) => setEventType(e.target.value)} className={selectCls}>
                            <option value="">Select Event Type</option>
                            <option value="Seminars">Seminars</option>
                            <option value="Family Event / Parties">Family Event / Parties</option>
                            <option value="Exhibitions">Exhibitions</option>
                            <option value="Anniversary">Anniversary</option>
                            <option value="Award Ceremonies">Award Ceremonies</option>
                            <option value="Charity and Fundraising">Charity and Fundraising</option>
                            <option value="Webinars">Webinars</option>
                            <option value="Team-Building Events">Team-Building Events</option>
                            <option value="Corporate Retreats">Corporate Retreats</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Location</label>
                        <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectCls} required>
                          <option value="">Select Location</option>
                          <option value="HSR Bengaluru">HSR Bengaluru</option>
                          <option value="Jayanagar Bengaluru">Jayanagar Bengaluru</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Message</label>
                        <div className="relative">
                          <MessageSquare className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                          <textarea
                            placeholder="Message *"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            className={`${inputCls} pl-10 resize-none`}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full mt-2 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-heading font-black uppercase tracking-wider text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    {activeTab === "workshop" ? "Confirm Workshop Booking" : activeTab === "corporate" ? "Submit Enquiry" : "Confirm Reservation"}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* Confirmation */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center mx-auto mb-2 shadow-md animate-bounce">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <h3 className="font-heading font-black text-2xl text-neutral-900 uppercase tracking-tight">
                  {activeTab === "corporate" ? "Enquiry Submitted!" : "Booking Confirmed!"}
                </h3>

                <p className="text-neutral-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-neutral-900">{fullName || "Guest"}</strong>!{" "}
                  {activeTab === "corporate"
                    ? `Your corporate enquiry for ${companyName || "your company"} at Mixnosh ${location} has been received.`
                    : `We have reserved your spot for ${activeTab === "workshop" ? workshopName : "Table Reservation"} at Mixnosh ${location} for ${guests} guest(s) on ${date}.`}
                </p>

                <div className="p-4 bg-orange-50/80 rounded-2xl border border-orange-200 text-xs text-neutral-600 font-semibold space-y-1 mt-4">
                  <p>
                    Our team will contact you on <strong className="text-neutral-900">{phone}</strong> with confirmation details.
                  </p>
                  <p>
                    Urgent? Call:{" "}
                    <strong className="text-neutral-900">+91 6364330840</strong> (HSR) /{" "}
                    <strong className="text-neutral-900">+91 9900018115</strong> (Jayanagar)
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="mt-6 px-8 py-3 rounded-full bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  Done & Return to Website
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
