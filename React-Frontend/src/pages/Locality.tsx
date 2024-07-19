import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoroughSelector from "../components/Questionnaire/BoroughSelector";
import AreaTypeSelector from "../components/Questionnaire/AreaTypeSelector";
import NavigationButtons from "../components/Questionnaire/NavigationButtons";
import "../index.css";
import QuestionnaireLayout from "../layouts/QuestionnaireLayout";
import { useQuestionnaire } from "../context/QuestionnaireProvider";
import QuestionPageHeader from "../components/Questionnaire/QuestionPageHeader";
import SingleSlider from "../components/Questionnaire/SingleSlider";

// Define the current step and total steps for the questionnaire progress
const currentStep = 3;
const totalSteps = 5;

const Locality: React.FC = () => {
  // State for selected boroughs
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);

  // State for selected area type
  const [areaType, setAreaType] = useState<string[]>([]);

  // State for importance of proximity to public transportation
  const [proximityImportance, setProximityImportance] = useState<number>(3);

  // State for importance of high footfall
  const [footfallImportance, setFootfallImportance] = useState<number>(3);

  // State for importance of being surrounded by similar businesses
  const [surroundingBusinessesImportance, setSurroundingBusinessesImportance] =
    useState<number>(3);


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

      const transformedBoroughs = selectedBoroughs.includes("No Preference")
        ? ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"]
        : selectedBoroughs;
      answerQuestion("selectedBoroughs", transformedBoroughs);

      const transformedArea = areaType.includes("No Preference")
        ? ["Residential", "Business oriented"]
        : areaType;
      answerQuestion("areaType", transformedArea);
      answerQuestion("proximityImportance", proximityImportance / 5);
        answerQuestion("footfallImportance", footfallImportance / 5);
        answerQuestion(
        "surroundingBusinessesImportance",
        surroundingBusinessesImportance / 5,
        );
      console.log(data);
      // Navigate to the next page
      navigate("/target-audience");
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
    answerQuestion("proximityImportance", proximityImportance / 5);
    answerQuestion("footfallImportance", footfallImportance / 5);
    answerQuestion(
      "surroundingBusinessesImportance",
      surroundingBusinessesImportance / 5,
    );
    // Navigate to the previous page
    navigate("/business-details");
  };

  return (
    <QuestionnaireLayout>
        <QuestionPageHeader title={'Locality and Environment'} pageNumber={2}/>
      {/* Borough selection component */}
        <BoroughSelector
          selectedBoroughs={selectedBoroughs}
          handleSelectBorough={handleSelectBorough}
          questionNumber={1}
        />

      {/* Area type selection component */}
        <AreaTypeSelector
          areaType={areaType}
          handleSelectAreaType={handleSelectAreaType}
          questionNumber={2}
        />
      
      {/* Error message display */}
      {error && <p className="text-red-500 mb-4">{error}</p>}


 {/* Importance slider for proximity to public transportation */}
 <SingleSlider
        label="How important is proximity to public transportation for your business?"
        min={1}
        max={5}
        steps={1}
        value={proximityImportance}
        setValue={setProximityImportance}
        questionNumber={3}
      />

      {/* Importance slider for high footfall */}
      <SingleSlider
        label="How important is high footfall?"
        min={1}
        max={5}
        steps={1}
        value={footfallImportance}
        setValue={setFootfallImportance}
        questionNumber={4}
      />

      {/* Importance slider for being surrounded by similar businesses */}
      <SingleSlider
        label="How important is being surrounded by similar businesses?"
        min={1}
        max={5}
        steps={1}
        value={surroundingBusinessesImportance}
        setValue={setSurroundingBusinessesImportance}
        questionNumber={5}
      />

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

export default Locality;
