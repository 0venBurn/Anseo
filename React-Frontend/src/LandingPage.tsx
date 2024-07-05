import React, { useState } from "react";
import { motion } from "framer-motion";

//Importing fonts (move to a more appropriate location later)
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import "@fontsource/fredoka-one";
import "@fontsource/commissioner";
import "@fontsource/inter";
import "./index.css";

//Importing components for the landing page
import LandingPageHeroSection from "./components/LandingPageHeroSection";
import Header from "./components/LandingPageHeader";
import MobileHeader from "./components/MobileHeader";
import LandingPageActionButtons from "./components/LandingPageActionButtons";

//Main component for the landing page
const LandingPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  //Function that toggles the mobile viewport visible hamburger menu (state= open/close)
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/*Hero section background image*/}
      <img
        src="../public/img/landing.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/*Header for small viewports (e.g., mobile devices)*/}
      <MobileHeader
        menuOpen={menuOpen}
        handleMenuToggle={handleMenuToggle}
        setMenuOpen={setMenuOpen}
      />

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.7 }}
        className="relative h-screen flex flex-col items-center justify-center text-black"
      >
        {/*Header for medium to large viewports (e.g., tablets and desktops) */}
        <Header />

        {/*Hero section*/}
        <LandingPageHeroSection />

        {/*Call to action (CTA) buttons*/}
        <LandingPageActionButtons />
      </motion.div>
    </>
  );
};

export default LandingPage;
