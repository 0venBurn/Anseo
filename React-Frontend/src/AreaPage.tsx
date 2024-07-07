import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import ImportanceSliderComponent from "./components/AreaPage/ImportanceSlider";
import RentBudgetSlider from "./components/AreaPage/RentBudgetSlider";
import NavigationButtons from "./components/QuestionsPage/NavigationButtons";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import "./index.css";

const currentStep = 4;
const totalSteps = 6;

const AreaPage: React.FC = () => {
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
  } = location.state || {};
  const [proximityImportance, setProximityImportance] = useState<number>(0.5);
  const [footfallImportance, setFootfallImportance] = useState<number>(0.5);
  const [surroundingBusinessesImportance, setSurroundingBusinessesImportance] =
    useState<number>(0.5);
  const [rentBudget, setRentBudget] = useState<number>(2500); // Default budget value

  const navigate = useNavigate();

  const handleNext = () => {
    // Calculate the adjusted rent budget
    const adjustedRentBudget = rentBudget / 5;

    // Navigate to the next page with state
    navigate("/extra", {
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
        rentBudget: adjustedRentBudget,
      },
    });
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
          <div className=" mt-10  w-full">
            <ImportanceSliderComponent
              value={proximityImportance}
              setValue={setProximityImportance}
              label="proximity to public transportation for your business"
            />
          </div>
          <div className=" mt-10  w-full">
            <ImportanceSliderComponent
              value={footfallImportance}
              setValue={setFootfallImportance}
              label="high footfall"
            />
          </div>
          <div className=" mt-10  w-full">
            <ImportanceSliderComponent
              value={surroundingBusinessesImportance}
              setValue={setSurroundingBusinessesImportance}
              label="being surrounded by similar businesses"
            />
          </div>
          <div className="mt-10  w-full">
            <RentBudgetSlider value={rentBudget} setValue={setRentBudget} />
          </div>
          <div className="mt-10">
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

export default AreaPage;
