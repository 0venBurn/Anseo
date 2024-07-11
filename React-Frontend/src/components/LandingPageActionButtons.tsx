import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuestionnaire } from "../context/QuestionnaireProvider";
/**
 * ActionButtons Component
 *
 * This component renders two action buttons:
 * 1. A "Start Now" button that navigates to the "/welcome" page.
 * 2. An "About" button that navigates to the "/about" page.
 *
 * The buttons are styled using Material-UI and the sx prop for custom styles.
 *
 * @returns The ActionButtons component.
 */

const ActionButtons: React.FC = () => {
  const navigate = useNavigate();
  const { answerQuestion, setQuestionnaireDefault } = useQuestionnaire();
  // useNavigate is a hook from react-router-dom for navigation to different pages or programs
  const handleClick = () => {
    answerQuestion("businessType", "Industry_Catering Establishment");
    answerQuestion("openHour", 8);
    answerQuestion("closeHour", 18);
    answerQuestion("budget", 20);
    answerQuestion("selectedAgeGroup", "20 to 24 years");
    answerQuestion("ageImportance", 0.5);
    answerQuestion("selectedIncomeLevel", "annual_individual_earnings_Data_$20,000-$29,999");
    answerQuestion("incomeImportance", 0.5);
    answerQuestion("targetGroup", "Singles");
    answerQuestion("proximityImportance", 0.5);
    answerQuestion("footfallImportance", 0.5);
    answerQuestion("surroundingBusinessesImportance", 0.5);
    answerQuestion("rentBudget", 500);
    answerQuestion("genderRatio", 0.5);
    answerQuestion("employmentStatus", "Full Time");
    answerQuestion("homeValue", 0.6);
    answerQuestion("populationDensity", 0.6);
    answerQuestion("selectedBoroughs", ["Manhattan"]);
    answerQuestion("areaType", "Business oriented");
    // setQuestionnaireDefault();

    navigate("/map")
  }

  return (
    // Container div for the action buttons with utility classes for styling
    <div className="relative z-10 flex space-x-4 mt-10">
      <Button
        variant="contained"
        sx={{
          fontFamily: "DM Mono",
          backgroundColor: "yellow", // Red background colour
          color: "black", // White text colour
          borderRadius: "50px", // Rounded Corners
          padding: "0.5rem 2rem", // Padding inside the button
        }}
        onClick={() => navigate("/welcome")} // Navigate to welcome on click
      >
        Start Now
      </Button>
      <Button
        variant="contained"
        sx={{
          fontFamily: "DM Mono",
          backgroundColor: "yellow", // Red background colour
          color: "black", // White text colour
          borderRadius: "50px", // Rounded Corners
          padding: "0.5rem 2rem", // Padding inside the button
        }}
        onClick={handleClick} // Navigate to welcome on click
      >
        Dummy submit
      </Button>
      <Button
        variant="outlined"
        sx={{
          fontFamily: "DM Mono",
          borderColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white border
          color: "black", // Black text colour
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white background
          padding: "0.5rem 2rem", // Padding inside the button
          backdropFilter: "blur(5px)", // Blur effect on the background
        }}
        onClick={() => navigate("/about")} // Navigate to about on click
      >
        About
      </Button>
    </div>
  );
};

export default ActionButtons;
