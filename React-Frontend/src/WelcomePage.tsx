import React from "react";
import { motion } from "framer-motion";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import "./index.css";
import Header from "./components/WelcomePageHeader";
import HeroSection from "./components/WelcomePageHeroSection";
import ActionButton from "./components/WelcomePageActionButton";
import ProgressIndicator from "./components/ProgressIndicator";

/**
 * WelcomePage component that combines Header, HeroSection, ActionButton, and ProgressIndicator components
 * to create the main landing page.
 */
const WelcomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen flex flex-col items-center justify-center text-black bg-gray-100"
    >
      <Header />
      <HeroSection />
      <ActionButton />
      <ProgressIndicator currentStep={1} totalSteps={4} />
    </motion.div>
  );
};

export default WelcomePage;
