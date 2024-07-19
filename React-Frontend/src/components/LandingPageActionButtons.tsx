import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuestionnaire } from "../context/QuestionnaireProvider";
import { motion } from "framer-motion";
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
  const { answerQuestion, setQuestionnaireDefault, sendDummyData } = useQuestionnaire();
  // useNavigate is a hook from react-router-dom for navigation to different pages or programs
  const handleClick = () => {
    sendDummyData();
    navigate("/map")
  }

  return (
    // Container div for the action buttons with utility classes for styling
    <div className="flex space-x-4 justify-center items-center gap-4">
      <motion.div
            whileHover={{
                scale: 1.1,
                borderRadius: "50px", 
            }}>
        <Button
          variant="contained"
          sx={{ 
              backgroundColor: "#DEDA6D", 
            color: "#3B447A", 
            textTransform: "none",
            fontFamily: "Inter",
            padding: "0.5rem 2rem", 
            borderRadius: "50px", 
            '&:hover': {
                backgroundColor: '#fef840',
                },
          }}
          onClick={() => navigate("/welcome")} 
          >
          Start Now
        </Button>    
        </motion.div>
      {/* <Button
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
      </Button> */}
      <motion.div
        whileHover={{
          scale: 1.1,
        }}>
      <Button
        variant="outlined"
        sx={{
          fontFamily: "Inter",
          borderColor: "#3B447A",
          borderWidth: "1px",
          borderRadius: "0px",
          color: "#3B447A",
          backgroundColor: "rgba(255, 255, 255, 0.5)", 
          padding: "0.5rem 2rem", 
          backdropFilter: "blur(5px)", 
          textTransform: "none",
          '&:hover': {
            borderColor: "#3B447A",
            borderWidth: "1px",
          }
        }}
        onClick={() => navigate("/about")} // Navigate to about on click
      >
        About
      </Button>
        </motion.div>
    </div>
  );
};

export default ActionButtons;
