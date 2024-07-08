import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SliderComponent from "./components/ExtraPage/SliderComponent";
import EmploymentStatusButtons from "./components/ExtraPage/EmploymentStatusButtons";
import NavigationButtons from "./components/QuestionsPage/NavigationButtons";
import "./index.css";
import QuestionnaireLayout from "./layouts/QuestionnaireLayout";
import { useQuestionnaire } from "./context/QuestionnaireProvider";

const currentStep = 5;
const totalSteps = 6;

const ExtraPage: React.FC = () => {
  const [genderRatio, setGenderRatio] = useState<number>(0.5);
  const [employmentStatus, setEmploymentStatus] = useState<string>("");
  const [homeValue, setHomeValue] = useState<number>(3000); // Default home value
  const [populationDensity, setPopulationDensity] = useState<number>(0.5); // Default population density
  const navigate = useNavigate();

  const { data, answerQuestion } = useQuestionnaire();

  const handleNext = () => {
    answerQuestion("genderRatio", genderRatio);
    answerQuestion("employmentStatus", employmentStatus);
    answerQuestion("homeValue", homeValue / 5000);
    answerQuestion("populationDensity", populationDensity);
    console.log(data)
    navigate("/borough");
  };

  return (
    <QuestionnaireLayout>
            <SliderComponent
              value={genderRatio}
              setValue={setGenderRatio}
              label="What gender is your business tailored towards?"
              min={0}
              max={1}
              step={0.01}
              marks={[
                { value: 0, label: "All Men" },
                { value: 1, label: "All Women" },
              ]}
            />
            <EmploymentStatusButtons
              value={employmentStatus}
              setValue={setEmploymentStatus}
            />
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
            <NavigationButtons
              currentStep={currentStep}
              totalSteps={totalSteps}
              handleNext={handleNext}
              />
  </QuestionnaireLayout>
  );
};

export default ExtraPage;
