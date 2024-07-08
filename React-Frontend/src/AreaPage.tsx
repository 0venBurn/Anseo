import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImportanceSliderComponent from "./components/AreaPage/ImportanceSlider";
import RentBudgetSlider from "./components/AreaPage/RentBudgetSlider";
import NavigationButtons from "./components/QuestionsPage/NavigationButtons";
import "./index.css";
import QuestionnaireLayout from "./layouts/QuestionnaireLayout";
import { useQuestionnaire } from "./context/QuestionnaireProvider";

const currentStep = 4;
const totalSteps = 6;

const AreaPage: React.FC = () => {
  const [proximityImportance, setProximityImportance] = useState<number>(0.5);
  const [footfallImportance, setFootfallImportance] = useState<number>(0.5);
  const [surroundingBusinessesImportance, setSurroundingBusinessesImportance] =
    useState<number>(0.5);
  const [rentBudget, setRentBudget] = useState<number>(2500); // Default budget value
  
  const { data, answerQuestion } = useQuestionnaire();

  const navigate = useNavigate();

  const handleNext = () => {
    answerQuestion("proximityImportance", proximityImportance);
    answerQuestion("footfallImportance", footfallImportance);
    answerQuestion("surroundingBusinessesImportance", surroundingBusinessesImportance);
    answerQuestion("rentBudget", rentBudget / 5);
    console.log(data)
    // Navigate to the next page with state
    navigate("/extra");
  };

  return (
    <QuestionnaireLayout>
            <ImportanceSliderComponent
              value={proximityImportance}
              setValue={setProximityImportance}
              label="proximity to public transportation for your business"
              />
            <ImportanceSliderComponent
              value={footfallImportance}
              setValue={setFootfallImportance}
              label="high footfall"
            />
            <ImportanceSliderComponent
              value={surroundingBusinessesImportance}
              setValue={setSurroundingBusinessesImportance}
              label="being surrounded by similar businesses"
            />
            <RentBudgetSlider value={rentBudget} setValue={setRentBudget} />
            <NavigationButtons
              currentStep={currentStep}
              totalSteps={totalSteps}
              handleNext={handleNext}
            />
   </QuestionnaireLayout>
  );
};

export default AreaPage;
