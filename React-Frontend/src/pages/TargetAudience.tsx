import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TargetGroupSelector from "../components/Questionnaire/TargetGroupSelector";
import NavigationButtons from "../components/Questionnaire/NavigationButtons";
import "../index.css";
import QuestionnaireLayout from "../layouts/QuestionnaireLayout";
import { useQuestionnaire } from "../context/QuestionnaireProvider";
import RangeSlider from "../components/Questionnaire/RangeSlider";
import SingleSlider from "../components/Questionnaire/SingleSlider";
import QuestionPageHeader from "../components/Questionnaire/QuestionPageHeader";
import Chat from "../components/Chatbox/Chat";
import IncompletePageWarning from "../components/Questionnaire/IncompletePageWarning";

// step setting for the progress indicator props
const currentStep = 4;
const totalSteps = 5;

const TargetAudience: React.FC = () => {
  // State for selected age group
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<number[]>([4, 65]);
  // State for importance of age, default to middle value
  const [ageImportance, setAgeImportance] = useState<number>(3);
  // State for selected income
  const [selectedIncomeLevel, setSelectedIncomeLevel] = useState<number[]>([
    10000, 100000,
  ]);
  // State for importance of income, default to middle value
  const [incomeImportance, setIncomeImportance] = useState<number>(3);
  // State for target group description
  const [targetGroup, setTargetGroup] = useState<string[]>([]);
   // State for gender ratio (1 = All Men, 5 = All Women)
   const [genderRatio, setGenderRatio] = useState<number>(0.5);

   // State for error message
  const [error, setError] = useState<string | null>(null); 

  // Access the questionnaire context
  const { data, answerQuestion } = useQuestionnaire();

  // Navigation between pages
  const navigate = useNavigate();

  // Handle next function to navigate with updated state
  const handleNext = () => {
    if (
      selectedAgeGroup.length > 0 &&
      ageImportance &&
      selectedIncomeLevel.length > 0 &&
      incomeImportance &&
      targetGroup.length > 0 
    ) {
      answerQuestion("selectedAgeGroup", selectedAgeGroup);
      answerQuestion("ageImportance", ageImportance / 5);
      answerQuestion("selectedIncomeLevel", selectedIncomeLevel);
      answerQuestion("incomeImportance", incomeImportance / 5);
      // Transform targetGroup if "No Preference" is selected
      const transformedTargetGroup = targetGroup.includes("No Preference")
        ? ["Families", "Singles"]
        : targetGroup;
      answerQuestion("targetGroup", transformedTargetGroup);
      answerQuestion("genderRatio", genderRatio / 5);
      setError(null); // Clear error message if all fields are filled
      console.log(data);
      navigate("/submit");
    } else {
      setError("Please answer all questions before proceeding.");
    }
  };

  // Handle previous function to navigate with updated state
  const handlePrev = () => {
    answerQuestion("selectedAgeGroup", selectedAgeGroup);
    answerQuestion("ageImportance", ageImportance / 5);
    answerQuestion("selectedIncomeLevel", selectedIncomeLevel);
    answerQuestion("incomeImportance", incomeImportance / 5);
    // Transform targetGroup if "No Preference" is selected
    const transformedTargetGroup = targetGroup.includes("No Preference")
      ? ["Families", "Singles"]
      : targetGroup;
    answerQuestion("targetGroup", transformedTargetGroup);
    answerQuestion("genderRatio", genderRatio / 5);
    navigate("/locality");
  };

  const handleSetSelectedAgeGroup = (newValue: number[]) => {
    setSelectedAgeGroup(newValue);
  };

  const handleSetSelectedIncomeLevel = (newValue: number[]) => {
    setSelectedIncomeLevel(newValue);
  };

  return (
    <>
      <QuestionnaireLayout>
        <QuestionPageHeader
          title={"Target Audience Demographics"}
          pageNumber={3}
        />
        <RangeSlider
          label="What is the age range of your target audience?"
          min={4}
          max={65}
          minDistance={1}
          steps={1}
          type="age"
          value={selectedAgeGroup}
          setValue={handleSetSelectedAgeGroup}
          questionNumber={1}
        />

        <SingleSlider
          label="How would you rate the importance of your target customer's age demographic?"
          min={1}
          max={5}
          steps={1}
          value={ageImportance}
          setValue={setAgeImportance}
          questionNumber={2}
        />

        <RangeSlider
          label="What is the income bracket of your target customers?"
          min={10000}
          max={100000}
          minDistance={1000}
          steps={1000}
          type="income"
          value={selectedIncomeLevel}
          setValue={handleSetSelectedIncomeLevel}
          questionNumber={3}
        />

        <SingleSlider
          label="How would you rate the importance of your target customer's yearly earning demographic? "
          min={1}
          max={5}
          steps={1}
          value={incomeImportance}
          setValue={setIncomeImportance}
          questionNumber={4}
        />

        <TargetGroupSelector
          targetGroup={targetGroup}
          setTargetGroup={setTargetGroup}
          questionNumber={5}
        />


        <SingleSlider
          label="Which gender does your business primarily cater to?"
          min={0}
          max={1}
          steps={0.01}
          value={genderRatio}
          setValue={setGenderRatio}
          type="gender"
          questionNumber={6}
          />

        {/* Display error message if present */}
        {error && <IncompletePageWarning error={error} />}

        <NavigationButtons
          currentStep={currentStep}
          totalSteps={totalSteps}
          handleNext={handleNext}
          handlePrev={handlePrev}
          />
      <Chat />
      </QuestionnaireLayout>
    </>
  );
};

// Export the TargetPage component as the default export
export default TargetAudience;
