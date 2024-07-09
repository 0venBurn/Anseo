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

const currentStep = 6;
const totalSteps = 6;

const BoroughPage: React.FC = () => {
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);
  const [areaType, setAreaType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data, answerQuestion } = useQuestionnaire();

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
      answerQuestion("selectedBoroughs", selectedBoroughs);
      answerQuestion("areaType", areaType);
      console.log(data);
      navigate("/submit");
    } else {
      setError("You need to select at least one borough and an area type");
    }
  };

  const handlePrev = () => {
    if (selectedBoroughs.length > 0 && areaType) {
      answerQuestion("selectedBoroughs", selectedBoroughs);
      answerQuestion("areaType", areaType);
      console.log(data);
      navigate("/submit");
    } else {
      setError("You need to select at least one borough and an area type");
    }
  };

  return (
    <QuestionnaireLayout>
      <div className="mt-10">
        <BoroughSelector
          selectedBoroughs={selectedBoroughs}
          handleSelectBorough={handleSelectBorough}
        />
      </div>
      <div className="mt-10">
        <AreaTypeSelector
          areaType={areaType}
          handleSelectAreaType={handleSelectAreaType}
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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

export default BoroughPage;
