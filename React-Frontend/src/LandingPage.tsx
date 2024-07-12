import React, { useState } from "react";
import { motion } from "framer-motion";
import Chat from "./components/Chatbox/Chat";

// import necessary components
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import "@fontsource/fredoka-one";
import Header from "./Header";
import LandingPageHeroSection from "./components/LandingPageHeroSection";
import "@fontsource/commissioner";
import "@fontsource/inter";
import "./index.css";

import LandingPageActionButtons from "./components/LandingPageActionButtons";
import { SignedIn, SignOutButton, useUser } from "@clerk/clerk-react";

//Main component for the landing page
const LandingPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoaded, isSignedIn } = useUser();

  console.log(isLoaded);
  console.log(isSignedIn);

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
        <SignedIn>
          <SignOutButton redirectUrl="http://localhost:3000" />
        </SignedIn>

        {/*Call to action (CTA) buttons*/}
        <LandingPageActionButtons />
      </motion.div>
    </>
  );
};

export default LandingPage;
