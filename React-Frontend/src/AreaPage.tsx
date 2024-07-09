import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImportanceSliderComponent from "./components/AreaPage/ImportanceSlider";
import RentBudgetSlider from "./components/AreaPage/RentBudgetSlider";
import NavigationButtons from "./components/QuestionsPage/NavigationButtons";
import "./index.css";
import QuestionnaireLayout from "./layouts/QuestionnaireLayout";
import { useQuestionnaire } from "./context/QuestionnaireProvider";

// Define the current step and total steps for the questionnaire progress
const currentStep = 4;
const totalSteps = 6;

const AreaPage: React.FC = () => {
  // State for importance of proximity to public transportation
  const [proximityImportance, setProximityImportance] = useState<number>(0.5);

  // State for importance of high footfall
  const [footfallImportance, setFootfallImportance] = useState<number>(0.5);

  // State for importance of being surrounded by similar businesses
  const [surroundingBusinessesImportance, setSurroundingBusinessesImportance] =
    useState<number>(0.5);

  // State for rent budget, default set to 2500
  const [rentBudget, setRentBudget] = useState<number>(2500);

  // Access the questionnaire context
  const { data, answerQuestion } = useQuestionnaire();

  // Hook for navigation between routes
  const navigate = useNavigate();

  // Handler for next button click
  const handleNext = () => {
    // Save all answers to the questionnaire context
    answerQuestion("proximityImportance", proximityImportance);
    answerQuestion("footfallImportance", footfallImportance);
    answerQuestion(
      "surroundingBusinessesImportance",
      surroundingBusinessesImportance,
    );
    answerQuestion("rentBudget", rentBudget / 5);
    console.log(data);
    // Navigate to the next page
    navigate("/extra");
  };

  // Handler for previous button click
  const handlePrev = () => {
    // Save all answers to the questionnaire context
    answerQuestion("proximityImportance", proximityImportance);
    answerQuestion("footfallImportance", footfallImportance);
    answerQuestion(
      "surroundingBusinessesImportance",
      surroundingBusinessesImportance,
    );
    answerQuestion("rentBudget", rentBudget / 5);
    // Navigate to the previous page
    navigate("/target");
  };

  return (
    <QuestionnaireLayout>
      {/* Importance slider for proximity to public transportation */}
      <div className="mt-10">
        <ImportanceSliderComponent
          value={proximityImportance}
          setValue={setProximityImportance}
          label="proximity to public transportation for your business"
        />
      </div>

      {/* Importance slider for high footfall */}
      <div className="mt-10">
        <ImportanceSliderComponent
          value={footfallImportance}
          setValue={setFootfallImportance}
          label="high footfall"
        />
      </div>

      {/* Importance slider for being surrounded by similar businesses */}
      <div className="mt-10">
        <ImportanceSliderComponent
          value={surroundingBusinessesImportance}
          setValue={setSurroundingBusinessesImportance}
          label="being surrounded by similar businesses"
        />
      </div>

      {/* Slider for rent budget */}
      <div className="mt-10">
        <RentBudgetSlider value={rentBudget} setValue={setRentBudget} />
      </div>

      {/* Navigation buttons */}
      <div className="absolute bottom-0">
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

export default AreaPage;
