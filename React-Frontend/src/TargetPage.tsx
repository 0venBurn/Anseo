import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TargetGroupSelector from "./components/TargetPage/TargetGroupSelector";
import NavigationButtons from "./components/QuestionsPage/NavigationButtons";
import "./index.css";
import QuestionnaireLayout from "./layouts/QuestionnaireLayout";
import { useQuestionnaire } from "./context/QuestionnaireProvider";
import RangeSlider from "./components/Questionnaire/RangeSlider";
import SingleSlider from "./components/Questionnaire/SingleSlider";

// step setting for the progress indicator props
const currentStep = 3;
const totalSteps = 6;

const TargetPage: React.FC = () => {
  // State for selected age group
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<number[]>([4, 65]);
  // State for importance of age, default to middle value
  const [ageImportance, setAgeImportance] = useState<number>(0.5);
  // State for selected income
  const [selectedIncomeLevel, setSelectedIncomeLevel] = useState<number[]>([
    10000, 100000,
  ]);
  // State for importance of income, default to middle value
  const [incomeImportance, setIncomeImportance] = useState<number>(0.5);
  // State for target group description
  const [targetGroup, setTargetGroup] = useState<string[]>([]);

  // Access the questionnaire context
  const { data, answerQuestion } = useQuestionnaire();

  // Navigation between pages
  const navigate = useNavigate();

  // Handle next function to navigate with updated state
  const handleNext = () => {
    answerQuestion("selectedAgeGroup", selectedAgeGroup);
    answerQuestion("ageImportance", ageImportance);
    answerQuestion("selectedIncomeLevel", selectedIncomeLevel);
    answerQuestion("incomeImportance", incomeImportance);
    // Transform targetGroup if "No Preference" is selected
    const transformedTargetGroup = targetGroup.includes("No Preference")
      ? ["Families", "Singles"]
      : targetGroup;
    answerQuestion("targetGroup", transformedTargetGroup);
    console.log(data);
    navigate("/area");
  };

  // Handle previous function to navigate with updated state
  const handlePrev = () => {
    answerQuestion("selectedAgeGroup", selectedAgeGroup);
    answerQuestion("ageImportance", ageImportance);
    answerQuestion("selectedIncomeLevel", selectedIncomeLevel);
    answerQuestion("incomeImportance", incomeImportance);
    // Transform targetGroup if "No Preference" is selected
    const transformedTargetGroup = targetGroup.includes("No Preference")
      ? ["Families", "Singles"]
      : targetGroup;
    answerQuestion("targetGroup", transformedTargetGroup);
    navigate("/questions");
  };

  const handleSetSelectedAgeGroup = (newValue: number[]) => {
    console.log(newValue);
    setSelectedAgeGroup(newValue);
  };

  const handleSetSelectedIncomeLevel = (newValue: number[]) => {
    console.log(newValue);
    setSelectedIncomeLevel(newValue);
  };

  return (
    <QuestionnaireLayout>
      <RangeSlider
        label="What age range is your target customers within?"
        min={4}
        max={65}
        minDistance={1}
        steps={1}
        type="age"
        value={selectedAgeGroup}
        setValue={handleSetSelectedAgeGroup}
        minMark="< 4"
        maxMark="65+"
      />

      <SingleSlider
        label="How important is the age of your target customers?"
        min={0}
        max={1}
        steps={0.01}
        value={ageImportance}
        setValue={setAgeImportance}
        minMark="Not important"
        maxMark="Important"
        type="percentage"
      />

      <RangeSlider
        label="What is your target customer's income level? "
        min={10000}
        max={100000}
        minDistance={1000}
        steps={1000}
        type="income"
        value={selectedIncomeLevel}
        setValue={handleSetSelectedIncomeLevel}
        minMark="< $10,000"
        maxMark="$100,000+"
      />

      <SingleSlider
        label="How important is the income of your target customers?"
        min={0}
        max={1}
        steps={0.01}
        value={incomeImportance}
        setValue={setIncomeImportance}
        minMark="Not important"
        maxMark="Important"
        type="percentage"
      />

      <TargetGroupSelector
        targetGroup={targetGroup}
        setTargetGroup={setTargetGroup}
      />

      <div className="mt-10">
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={totalSteps}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
    </QuestionnaireLayout>
  );
};

// Export the TargetPage component as the default export
export default TargetPage;
