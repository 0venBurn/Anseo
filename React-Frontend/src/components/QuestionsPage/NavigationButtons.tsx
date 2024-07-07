import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../ProgressIndicator";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  handleNext: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  handleNext,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mb-12">
      <div className="flex items-center justify-between px-4">
        <Button
          variant="contained"
          sx={{
            fontFamily: "Commissioner",
            fontSize: "1.25rem",
            padding: "0.75rem 2rem",
            backgroundColor: "#D1D6F5",
            color: "black",
            borderRadius: "50px",
            "&:hover": {
              backgroundColor: "#f89a93",
            },
          }}
          onClick={() => navigate("/welcome")}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <div className="mx-4">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </div>
        <Button
          variant="contained"
          sx={{
            fontFamily: "Commissioner",
            fontSize: "1.25rem",
            padding: "0.75rem 2rem",
            backgroundColor: "#DEDA6D",
            color: "white",
            borderRadius: "50px",
            "&:hover": {
              backgroundColor: "#f14624",
            },
          }}
          onClick={handleNext}
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default NavigationButtons;
