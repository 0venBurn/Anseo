import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmploymentStatusButtons from "./components/ExtraPage/EmploymentStatusButtons";
import NavigationButtons from "./components/QuestionsPage/NavigationButtons";
import "./index.css";
import QuestionnaireLayout from "./layouts/QuestionnaireLayout";
import { useQuestionnaire } from "./context/QuestionnaireProvider";
import SingleSlider from "./components/Questionnaire/SingleSlider";

// Define the current step and total steps for the questionnaire progress
const currentStep = 5;
const totalSteps = 6;

const ExtraPage: React.FC = () => {
  // State for gender ratio (0 = All Men, 1 = All Women)
  const [genderRatio, setGenderRatio] = useState<number>(0.5);

  // State for employment status
  const [employmentStatus, setEmploymentStatus] = useState<string[]>([]);

  // State for home value, default set to 3000
  const [homeValue, setHomeValue] = useState<number>(250000);

  // State for population density, default set to 0.5
  const [populationDensity, setPopulationDensity] = useState<number>(0.5);

  // Hook for navigation between routes
  const navigate = useNavigate();

  // Access the questionnaire context
  const { data, answerQuestion } = useQuestionnaire();

  // Handler for next button click
  const handleNext = () => {
    // Save all answers to the questionnaire context
    answerQuestion("genderRatio", genderRatio);
    answerQuestion("employmentStatus", employmentStatus);
    answerQuestion("homeValue", homeValue / 5000);
    answerQuestion("populationDensity", populationDensity);
    // Navigate to the next page
    navigate("/borough");
  };

  // Handler for previous button click
  const handlePrev = () => {
    // Save all answers to the questionnaire context
    answerQuestion("genderRatio", genderRatio);
    answerQuestion("employmentStatus", employmentStatus);
    answerQuestion("homeValue", homeValue / 5000);
    answerQuestion("populationDensity", populationDensity);
    // Navigate to the previous page
    navigate("/area");
  };

  return (
    <QuestionnaireLayout>
      {/* Slider for gender ratio */}
      <SingleSlider
        label="What gender is your business tailored towards?"
        min={0}
        max={1}
        steps={0.01}
        value={genderRatio}
        setValue={setGenderRatio}
        minMark="All Men"
        maxMark="All Women"
        type="percentage"
      />

      {/* Buttons for selecting employment status */}
      <div className="mt-10">
        <EmploymentStatusButtons
          value={employmentStatus}
          setValue={setEmploymentStatus}
        />
      </div>

      {/* Slider for home value */}
      <SingleSlider
        label="What is the estimated home value of people you are trying to target?"
        min={1000}
        max={500000}
        steps={100}
        value={homeValue}
        setValue={setHomeValue}
        minMark="< $1000"
        maxMark="$500000+"
        type="money"
      />

      {/* Slider for population density */}
      <SingleSlider
        label="How dense do you want the population to be?"
        min={0}
        max={1}
        steps={0.01}
        value={populationDensity}
        setValue={setPopulationDensity}
        minMark="Low Density"
        maxMark="High Density"
        type="percentage"
      />

      {/* Navigation buttons */}
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

export default ExtraPage;
