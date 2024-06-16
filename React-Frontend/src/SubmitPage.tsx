import React from "react";
import { motion } from "framer-motion";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import Header from "./components/SubmitHeader";
import MainContent from "./components/SubmitMainContent";
import Footer from "./components/SubmitFooter";

const SubmitPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen flex flex-col items-center justify-center text-black bg-gray-100"
    >
      <Header />
      <MainContent />
      <Footer />
    </motion.div>
  );
};

export default SubmitPage;
