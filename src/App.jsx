import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import WorkshopsSection, {
  WORKSHOPS_DATA,
} from "./components/WorkshopsSection";
import WorkshopDetailPage from "./components/WorkshopDetailPage";
import DiningSection from "./components/DiningSection";
import SneakerResinSection from "./components/SneakerResinSection";
import CorporateSection from "./components/CorporateSection";
import BookClubSection from "./components/BookClubSection";
import Testimonials from "./components/Testimonials";
import ArtfulMoments from "./components/ArtfulMoments";
import LocationsSection from "./components/LocationsSection";
import BookingModal from "./components/BookingModal";
import MenuModal from "./components/MenuModal";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";

export default function App() {
  const [currentView, setCurrentView] = useState("home"); // 'home' | 'workshops' | 'workshop-detail'
  const [selectedWorkshop, setSelectedWorkshop] = useState(WORKSHOPS_DATA[0]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingModalType, setBookingModalType] = useState("workshop");
  const [selectedWorkshopTitle, setSelectedWorkshopTitle] = useState("");
  const [activeLocation, setActiveLocation] = useState("hsr"); // Global location state
  const [menuModalOpen, setMenuModalOpen] = useState(false);

  const handleOpenBooking = (type = "workshop", title = "") => {
    setBookingModalType(type);
    setSelectedWorkshopTitle(title);
    setBookingModalOpen(true);
  };

  const handleSelectWorkshopDetail = (workshop) => {
    setSelectedWorkshop(workshop);
    setCurrentView("workshop-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-dark-mesh text-neutral-200 selection:bg-teal-500 selection:text-white flex flex-col">
      {/* Interactive Animated Intro Preloader Splash Screen */}
      <Preloader />

      {/* Sticky Glassmorphic Navbar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeLocation={activeLocation}
        setActiveLocation={setActiveLocation}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === "home" && (
          <>
            <Hero
              onOpenBooking={handleOpenBooking}
              onViewWorkshops={() => setCurrentView("workshops")}
            />
            <AboutSection onOpenBooking={handleOpenBooking} />
            <DiningSection
              onOpenBooking={handleOpenBooking}
              onOpenMenu={() => setMenuModalOpen(true)}
              activeLocation={activeLocation}
              setActiveLocation={setActiveLocation}
            />
            <SneakerResinSection onOpenBooking={handleOpenBooking} />
            <WorkshopsSection
              onSelectWorkshop={handleSelectWorkshopDetail}
              onOpenBooking={handleOpenBooking}
            />
            <CorporateSection onOpenBooking={handleOpenBooking} />
            <BookClubSection onOpenBooking={handleOpenBooking} />

            <ArtfulMoments />
            <Testimonials />
            <LocationsSection onOpenBooking={handleOpenBooking} />
          </>
        )}

        {currentView === "workshops" && (
          <div className="pt-8">
            <WorkshopsSection
              onSelectWorkshop={handleSelectWorkshopDetail}
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

        {currentView === "workshop-detail" && (
          <WorkshopDetailPage
            workshop={selectedWorkshop}
            onBack={() => setCurrentView("workshops")}
            onOpenBooking={handleOpenBooking}
          />
        )}
      </main>

      {/* Global Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialType={bookingModalType}
        initialSelectedTitle={selectedWorkshopTitle}
      />

      {/* Full Menu Modal */}
      <MenuModal
        isOpen={menuModalOpen}
        onClose={() => setMenuModalOpen(false)}
        onOpenBooking={handleOpenBooking}
      />

      {/* Footer */}
      <Footer
        setCurrentView={setCurrentView}
        onOpenBooking={handleOpenBooking}
      />
    </div>
  );
}
