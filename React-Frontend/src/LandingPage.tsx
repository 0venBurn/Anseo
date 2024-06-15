import React from "react";
import { motion } from "framer-motion";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import "@fontsource/fredoka-one";
import Header from "./components/LandingPageHeader";
import HeroSection from "./components/LandingPageHeroSection";
import ActionButtons from "./components/LandingPageActionButtons";
import BackgroundImage from "./components/BackgroundImage";

const LandingPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen flex flex-col items-center justify-center text-black"
    >
      <BackgroundImage />
      <div
        className="absolute top-10 left-1/2 transform -translate-x-1/2 text-5xl font-bold text-orange-600"
        style={{ fontFamily: "Fredoka One" }}
      >
        ANSEO
      </div>
      <Header />
      <HeroSection />
      <ActionButtons />
    </motion.div>
  );
};

export default LandingPage;
