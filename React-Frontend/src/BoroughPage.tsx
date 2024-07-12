import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoroughSelector from "./components/BoroughPage/BoroughSelector";
import AreaTypeSelector from "./components/BoroughPage/AreaTypeSelector";
import NavigationButtons from "./components/QuestionsPage/NavigationButtons";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import "./index.css";
import QuestionnaireLayout from "./layouts/QuestionnaireLayout";
import { useQuestionnaire } from "./context/QuestionnaireProvider";

// Define the current step and total steps for the questionnaire progress
const currentStep = 6;
const totalSteps = 6;

const BoroughPage: React.FC = () => {
  // State for selected boroughs
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);

  // State for selected area type
  const [areaType, setAreaType] = useState<string[]>([]);

  // State for error message
  const [error, setError] = useState<string | null>(null);

  // Hook for navigation between routes
  const navigate = useNavigate();

  // Access the questionnaire context
  const { data, answerQuestion } = useQuestionnaire();

  // Handler for borough selection
  const handleSelectBorough = (boroughs: string[]) => {
    setSelectedBoroughs(boroughs);
    setError(null);
  };

  // Handler for area type selection
  const handleSelectAreaType = (types: string[]) => {
    setAreaType(types);
    setError(null);
  };

  // Handler for next button click
  const handleNext = () => {
    if (selectedBoroughs.length > 0 && areaType.length > 0) {
      // Save answers to the questionnaire context
      answerQuestion("selectedBoroughs", selectedBoroughs);
      answerQuestion("areaType", areaType);
      console.log(data);
      // Navigate to the next page
      navigate("/submit");
    } else {
      // Set error if selections are incomplete
      setError("You need to select at least one borough and an area type");
    }
  };

  // Handler for previous button click
  const handlePrev = () => {
    // Save answers to the questionnaire context
    answerQuestion("selectedBoroughs", selectedBoroughs);
    answerQuestion("areaType", areaType);
    // Navigate to the previous page
    navigate("/extra");
  };

  return (
    <QuestionnaireLayout>
      {/* Borough selection component */}
      <div className="mt-10">
        <BoroughSelector
          selectedBoroughs={selectedBoroughs}
          handleSelectBorough={handleSelectBorough}
        />
      </div>

      {/* Area type selection component */}
      <div className="mt-10">
        <AreaTypeSelector
          areaType={areaType}
          handleSelectAreaType={handleSelectAreaType}
        />
      </div>

      {/* Error message display */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Navigation buttons */}
      {/* <div className="absolute bottom-0"> */}
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={totalSteps}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      {/* </div> */}
    </QuestionnaireLayout>
  );
};

export default BoroughPage;
