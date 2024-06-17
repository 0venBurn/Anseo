import React from "react";
import { motion } from "framer-motion";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import Header from "./components/HeaderWithProfileIcon";
import MainContent from "./components/SubmitMainContent";
import ProgressIndicator from "./components/ProgressIndicator";
import BackButton from "./components/BackButton";

const SubmitPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen bg-gray-100 text-black flex flex-col items-center justify-between"
    >
      <Header />
      <MainContent />

      <ProgressIndicator currentStep={4} totalSteps={4} />
      <div className="flex justify-between w-2/3 mt-10 px-80 mb-10">
        <BackButton path="/questions" />
      </div>
    </motion.div>
  );
};

export default SubmitPage;
