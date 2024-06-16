import React, { useState } from "react";
import { motion } from "framer-motion";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import Header from "./components/QuestionsHeader";
import QuestionSection from "./components/QuestionsSection";
import BackButton from "./components/BackButton";
import NextButton from "./components/NextButton";
import ProgressIndicator from "./components/ProgressIndicator";
import FavoriteIcon from "@mui/icons-material/Favorite";

const QuestionPage1: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, option];
      } else {
        return prevSelected;
      }
    });
  };

  const options = [
    { label: "Affordability", icon: <span>&#36;</span> },
    { label: "Footfall", icon: <span>&#128101;</span> },
    { label: "Connectivity", icon: <span>&#128652;</span> },
    { label: "Public safety", icon: <span>&#128110;</span> },
    { label: "Option W", icon: <span>&#127979;</span> },
    { label: "Option X", icon: <FavoriteIcon /> },
    { label: "Option Y", icon: <FavoriteIcon /> },
    { label: "Option Z", icon: <span>&#127794;</span> },
  ];

  const title =
    "1. What factors are most important to you when choosing the perfect location for your business?";

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen bg-gray-100 text-black flex flex-col items-center justify-between"
    >
      <Header />
      <QuestionSection
        title={title}
        selected={selected}
        handleSelect={handleSelect}
        options={options}
      />
      <ProgressIndicator currentStep={1} totalSteps={4} />
      <div className="flex justify-between w-1/2 mt-10 px-80 mb-10">
        <BackButton path="/welcome" />
        <NextButton path="/borough" />
      </div>
    </motion.div>
  );
};

export default QuestionPage1;
