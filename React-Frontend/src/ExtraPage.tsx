import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import SliderComponent from "./components/ExtraPage/SliderComponent";
import EmploymentStatusButtons from "./components/ExtraPage/EmploymentStatusButtons";
import NavigationButtons from "./components/QuestionsPage/NavigationButtons";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import "./index.css";

const currentStep = 5;
const totalSteps = 6;

const ExtraPage: React.FC = () => {
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
  } = location.state || {};
  const [genderRatio, setGenderRatio] = useState<number>(0.5);
  const [employmentStatus, setEmploymentStatus] = useState<string | null>(null);
  const [homeValue, setHomeValue] = useState<number>(3000); // Default home value
  const [populationDensity, setPopulationDensity] = useState<number>(0.5); // Default population density
  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to the next page with state
    navigate("/borough", {
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
          <div className="mt-10  w-full">
            <SliderComponent
              value={genderRatio}
              setValue={setGenderRatio}
              label="1. What gender are is your business tailored towards?"
              min={0}
              max={1}
              step={0.01}
              marks={[
                { value: 0, label: "All Men" },
                { value: 1, label: "All Women" },
              ]}
            />
          </div>
          <div className="mt-10  w-full">
            <EmploymentStatusButtons
              value={employmentStatus}
              setValue={setEmploymentStatus}
            />
          </div>
          <div className="mt-10  w-full">
            <SliderComponent
              value={homeValue}
              setValue={setHomeValue}
              label="3. What is the home value?"
              min={1000}
              max={5000}
              step={100}
              marks={[
                { value: 1000, label: "< $1000" },
                { value: 5000, label: "$5000" },
              ]}
            />
          </div>
          <div className="mt-10  w-full">
            <SliderComponent
              value={populationDensity}
              setValue={setPopulationDensity}
              label="4. How dense do you want the population to be?"
              min={0}
              max={1}
              step={0.01}
              marks={[
                { value: 0, label: "Low Density" },
                { value: 1, label: "High Density" },
              ]}
            />
          </div>
          <div className="mt-10  ">
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

export default ExtraPage;
