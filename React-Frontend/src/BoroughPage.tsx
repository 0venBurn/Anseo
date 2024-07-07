import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import BoroughSelector from "./components/BoroughPage/BoroughSelector";
import AreaTypeSelector from "./components/BoroughPage/AreaTypeSelector";
import NavigationButtons from "./components/QuestionsPage/NavigationButtons";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import "./index.css";

const currentStep = 6;
const totalSteps = 6;

const BoroughPage: React.FC = () => {
  const location = useLocation();
  const {
    businessType,
    openHour,
    closeHour,
    budget,
    selectedAgeGroup,
    ageImportance,
    selectedIncomeLevel,
    incomeImportance,
    targetGroup,
    proximityImportance,
    footfallImportance,
    surroundingBusinessesImportance,
    rentBudget,
    genderRatio,
    employmentStatus,
    homeValue,
    populationDensity,
  } = location.state || {};

  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);
  const [areaType, setAreaType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelectBorough = (option: string) => {
    setSelectedBoroughs((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, option];
      } else {
        return prevSelected;
      }
    });
    setError(null);
  };

  const handleSelectAreaType = (option: string) => {
    setAreaType(option);
    setError(null);
  };

  const handleNext = () => {
    if (selectedBoroughs.length > 0 && areaType) {
      navigate("/test", {
        state: {
          businessType,
          openHour,
          closeHour,
          budget,
          selectedAgeGroup,
          ageImportance,
          selectedIncomeLevel,
          incomeImportance,
          targetGroup,
          proximityImportance,
          footfallImportance,
          surroundingBusinessesImportance,
          rentBudget,
          genderRatio,
          employmentStatus,
          homeValue,
          populationDensity,
          selectedBoroughs,
          areaType,
        },
      });
    } else {
      setError("You need to select at least one borough and an area type");
    }
  };

  return (
    <>
      <Header />
      <div className="relative h-full flex flex-col items-center justify-center text-black bg-gray-100">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mt-24 px-4 md:px-10 flex-grow md:mt-32"
        >
          <div className="mt-10  w-full">
            <BoroughSelector
              selectedBoroughs={selectedBoroughs}
              handleSelectBorough={handleSelectBorough}
            />
          </div>
          <div className="mt-10  w-full">
            <AreaTypeSelector
              areaType={areaType}
              handleSelectAreaType={handleSelectAreaType}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mt-40  ">
            <NavigationButtons
              currentStep={currentStep}
              totalSteps={totalSteps}
              handleNext={handleNext}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default BoroughPage;
