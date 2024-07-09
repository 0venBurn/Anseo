import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AgeGroupSelector from "./components/TargetPage/AgeGroupSelector";
import ImportanceSlider from "./components/TargetPage/ImportanceSlider";
import IncomeLevelSelector from "./components/TargetPage/IncomeLevelSelector";
import TargetGroupSelector from "./components/TargetPage/TargetGroupSelector";
import NavigationButtons from "./components/QuestionsPage/NavigationButtons";
import "./index.css";
import { SelectChangeEvent } from "@mui/material/Select";
import QuestionnaireLayout from "./layouts/QuestionnaireLayout";
import { useQuestionnaire } from "./context/QuestionnaireProvider";

// step setting for the progress indicator props
const currentStep = 3;
const totalSteps = 6;

const TargetPage: React.FC = () => {
  // State for selected age group
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("");
  // State for importance of age, default to middle value
  const [ageImportance, setAgeImportance] = useState<number>(0.5);
  // State for selected income
  const [selectedIncomeLevel, setSelectedIncomeLevel] = useState<string>("");
  // State for importance of income, default to middle value
  const [incomeImportance, setIncomeImportance] = useState<number>(0.5);
  // State for target group description
  const [targetGroup, setTargetGroup] = useState<string>("");

  //  Access the questionaire context
  const { data, answerQuestion } = useQuestionnaire();

  // Navigation between pages
  const navigate = useNavigate();

  // Handle next function to navigate with updated state
  const handleNext = () => {
    answerQuestion("selectedAgeGroup", selectedAgeGroup);
    answerQuestion("ageImportance", ageImportance);
    answerQuestion("selectedIncomeLevel", selectedIncomeLevel);
    answerQuestion("incomeImportance", incomeImportance);
    answerQuestion("targetGroup", targetGroup);
    answerQuestion("selectedAgeGroup", selectedAgeGroup);
    console.log(data);
    navigate("/area");
  };

  // Handle previous function to navigate with updated state

  const handlePrev = () => {
    answerQuestion("selectedAgeGroup", selectedAgeGroup);
    answerQuestion("ageImportance", ageImportance);
    answerQuestion("selectedIncomeLevel", selectedIncomeLevel);
    answerQuestion("incomeImportance", incomeImportance);
    answerQuestion("targetGroup", targetGroup);
    answerQuestion("selectedAgeGroup", selectedAgeGroup);

    navigate("/questions");
  };
  // State handler for age group select
  const handleAgeGroupSelect = (event: SelectChangeEvent<string>) => {
    setSelectedAgeGroup(event.target.value as string);
  };

  // State handler for income level select
  const handleIncomeLevelSelect = (event: SelectChangeEvent<string>) => {
    setSelectedIncomeLevel(event.target.value as string);
  };

  // age options
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

  // income options
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
    <QuestionnaireLayout>
      {/* Component for selecting the age group of the target audience */}
      <AgeGroupSelector
        selectedAgeGroup={selectedAgeGroup}
        handleAgeGroupSelect={handleAgeGroupSelect}
        ageOptions={ageOptions}
      />

      {/* Slider to set the importance of age in targeting */}
      <ImportanceSlider
        value={ageImportance}
        setValue={setAgeImportance}
        label="age"
      />

      {/* Component for selecting the income level of the target audience */}
      <IncomeLevelSelector
        selectedIncomeLevel={selectedIncomeLevel}
        handleIncomeLevelSelect={handleIncomeLevelSelect}
        incomeOptions={incomeOptions}
      />

      {/* Slider to set the importance of income in targeting */}
      <ImportanceSlider
        value={incomeImportance}
        setValue={setIncomeImportance}
        label="income"
      />

      {/* Component for describing the target group */}
      <TargetGroupSelector
        targetGroup={targetGroup}
        setTargetGroup={setTargetGroup}
      />

      {/* Navigation buttons for moving between questionnaire steps */}
      <NavigationButtons
        currentStep={currentStep}
        totalSteps={totalSteps}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </QuestionnaireLayout>
  );
};

// Export the TargetPage component as the default export
export default TargetPage;
