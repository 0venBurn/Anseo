import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import AgeGroupSelector from "./components/TargetPage/AgeGroupSelector";
import ImportanceSlider from "./components/TargetPage/ImportanceSlider";
import IncomeLevelSelector from "./components/TargetPage/IncomeLevelSelector";
import TargetGroupSelector from "./components/TargetPage/TargetGroupSelector";
import NavigationButtons from "./components/QuestionsPage/NavigationButtons";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import "./index.css";
import { SelectChangeEvent } from "@mui/material/Select";

const currentStep = 3;
const totalSteps = 6;

const TargetPage: React.FC = () => {
  const location = useLocation();
  const { businessType, openHour, closeHour, budget } = location.state || {};
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("");
  const [ageImportance, setAgeImportance] = useState<number>(0.5);
  const [selectedIncomeLevel, setSelectedIncomeLevel] = useState<string>("");
  const [incomeImportance, setIncomeImportance] = useState<number>(0.5);
  const [targetGroup, setTargetGroup] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/area", {
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
      },
    });
  };

  const handleAgeGroupSelect = (event: SelectChangeEvent<string>) => {
    setSelectedAgeGroup(event.target.value as string);
  };

  const handleIncomeLevelSelect = (event: SelectChangeEvent<string>) => {
    setSelectedIncomeLevel(event.target.value as string);
  };

  const ageOptions = [
    "Under 5 years",
    "5 to 9 years",
    "10 to 14 years",
    "15 to 19 years",
    "20 to 24 years",
    "25 to 29 years",
    "30 to 34 years",
    "35 to 39 years",
    "40 to 44 years",
    "45 to 49 years",
    "50 to 54 years",
    "55 to 59 years",
    "60 to 64 years",
    "65 to 69 years",
    "70 to 74 years",
    "75 to 79 years",
    "80 to 84 years",
    "85 years and over",
  ];

  const incomeOptions = [
    "annual_individual_earnings_Data_< $10,000",
    "annual_individual_earnings_Data_$10,000-$19,999",
    "annual_individual_earnings_Data_$20,000-$29,999",
    "annual_individual_earnings_Data_$30,000-$39,999",
    "annual_individual_earnings_Data_$40,000-$49,999",
    "annual_individual_earnings_Data_$50,000-$64,999",
    "annual_individual_earnings_Data_$65,000-$74,999",
    "annual_individual_earnings_Data_$75,000-$99,999",
    "annual_individual_earnings_Data_$100,000+",
  ];

  return (
    <>
      <Header />
      <div className="relative h-full flex flex-col items-center justify-center text-black bg-gray-100">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mt-12 px-4 md:px-10 flex-grow md:mt-32"
        >
          <AgeGroupSelector
            selectedAgeGroup={selectedAgeGroup}
            handleAgeGroupSelect={handleAgeGroupSelect}
            ageOptions={ageOptions}
          />
          <ImportanceSlider
            value={ageImportance}
            setValue={setAgeImportance}
            label="age"
          />
          <IncomeLevelSelector
            selectedIncomeLevel={selectedIncomeLevel}
            handleIncomeLevelSelect={handleIncomeLevelSelect}
            incomeOptions={incomeOptions}
          />
          <ImportanceSlider
            value={incomeImportance}
            setValue={setIncomeImportance}
            label="income"
          />
          <TargetGroupSelector
            targetGroup={targetGroup}
            setTargetGroup={setTargetGroup}
          />
          <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
          />
        </motion.div>
      </div>
    </>
  );
};

export default TargetPage;
