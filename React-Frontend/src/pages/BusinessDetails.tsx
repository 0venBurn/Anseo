// Question page one that deals with the questions regarding:
// business type
// operating hours
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BusinessTypeSelector from "../components/Questionnaire/BusinessTypeSelector";
import OperatingHoursSelector from "../components/Questionnaire/OperatingHourSelect";
import NavigationButtons from "../components/Questionnaire/NavigationButtons";
import "../index.css";
import QuestionnaireLayout from "../layouts/QuestionnaireLayout";
import { useQuestionnaire } from "../context/QuestionnaireProvider";
import SingleSlider from "../components/Questionnaire/SingleSlider";
import QuestionPageHeader from "../components/Questionnaire/QuestionPageHeader";
import Chat from "../components/Chatbox/Chat";
import IncompletePageWarning from "../components/Questionnaire/IncompletePageWarning";

const BusinessDetails: React.FC = () => {
  const [businessType, setBusinessType] = useState<string>("");
  const [openHour, setOpenHour] = useState<number>(8); // Default to 8 AM
  const [closeHour, setCloseHour] = useState<number>(18); // Default to 6 PM
  const [budget, setBudget] = useState<number>(30); // Default budget value
  // State for rent budget, default set to 3000
  const [rentBudget, setRentBudget] = useState<number>(3000);
  
  // State for error message
  const [error, setError] = useState<string | null>(null);

  const { answerQuestion } = useQuestionnaire();

  // setting steps for progress indicator
  const currentStep = 2;
  const totalSteps = 5;

  const navigate = useNavigate();

  // handle next function to navigate to the next page with state
  const handleNext = () => {
    if (businessType && budget && rentBudget) {
      answerQuestion("businessType", businessType);
      answerQuestion("openHour", openHour);
      answerQuestion("closeHour", closeHour);
      answerQuestion("budget", budget);
      answerQuestion("rentBudget", rentBudget / 5);
      setError(null); // Clear error message if all fields are filled
      navigate("/locality");
    } else {
      setError("Please answer all questions before proceeding.");
    }
  };

  // handle previous function to navigate to previous page with state
  const handlePrev = () => {
    answerQuestion("businessType", businessType);
    answerQuestion("openHour", openHour);
    answerQuestion("closeHour", closeHour);
    answerQuestion("budget", budget);
    answerQuestion("rentBudget", rentBudget / 5);
    navigate("/welcome");
  };

  // handler for business type
  const handleBusinessTypeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessType(`Industry_${event.target.value}`);
  };

  return (
    <>
      <QuestionnaireLayout>
        <QuestionPageHeader title={"Business Details"} pageNumber={1} />
        {/* Business type selector component */}
        <BusinessTypeSelector
          handleBusinessTypeInput={handleBusinessTypeInput}
          questionNumber={1}
        />
        {/* Operating hours  selector component */}
        <OperatingHoursSelector
          openHour={openHour}
          closeHour={closeHour}
          setOpenHour={setOpenHour}
          setCloseHour={setCloseHour}
          questionNumber={2}
        />
      <SingleSlider
        label="What is your budget for paying employees? (Specify hourly rates)"
        min={10}
        max={50}
        steps={1}
        value={budget}
        setValue={setBudget}
        type="money"
        questionNumber={3}
      />
      <SingleSlider
        label="What is your monthly budget for rent and utilities?"
        min={1000}
        max={5000}
        steps={100}
        value={rentBudget}
        setValue={setRentBudget}
        type="money"
        questionNumber={4}
      />
        {/* Display error message if present */}
        {error && <IncompletePageWarning error={error} />}
        
        {/* Navigation button component*/}
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

export default BusinessDetails;
