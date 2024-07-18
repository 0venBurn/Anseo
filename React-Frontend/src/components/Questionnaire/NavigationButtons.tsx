import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ProgressIndicator from "../ProgressIndicator";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  handleNext?: () => void;
  handlePrev?: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  handleNext,
  handlePrev,
}) => {

  return (
      <div className="flex items-center justify-between px-4 mb-12">
        {handlePrev && <Button
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
          onClick={handlePrev}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        }
        <div className="mx-4">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </div>
        {handleNext && <Button
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
        }
      </div>
  );
};

export default NavigationButtons;
