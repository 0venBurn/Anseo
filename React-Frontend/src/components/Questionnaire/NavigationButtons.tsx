import React from "react";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 px-4 mb-12 w-full">
       <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      <div className="flex items-center justify-center w-full gap-4 sm:gap-12">
        {handlePrev && <motion.div whileHover={{
          scale: 1.1
        }}>
            <Button
            variant="contained"
            sx={{
              fontFamily: "Commissioner",
              padding: "0.75rem 2rem",
              fontSize: "1.1rem",
              backgroundColor: "#D1D6F5",
              color: "#3B447A",
              textTransform: "none",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "#3B447A",
                color: 'white'
              },
            }}
            onClick={handlePrev}
            startIcon={<ArrowBackIcon />}
            >
            Back
          </Button>
        </motion.div>
        }
        {handleNext && <motion.div whileHover={{
          scale: 1.1
        }}>
        <Button
          variant="contained"
          sx={{
            fontFamily: "Commissioner",
            padding: "0.75rem 2rem",
            fontSize: "1.1rem",
            backgroundColor: "#DEDA6D",
            color: "#3B447A",
            textTransform: "none",
            borderRadius: "50px",
            "&:hover": {
              backgroundColor: "#3B447A",
              color: "white",
            },
          }}
          onClick={handleNext}
          endIcon={<ArrowForwardIcon />}
          >
          Next
        </Button>
      </motion.div>
      }
    </div>
    </div>
  );
  } else {
    return (
      <div className="flex items-center justify-between px-4 mb-12 max-w-md">
        {handlePrev && <motion.div whileHover={{
          scale: 1.1
        }}>
            <Button
            variant="contained"
            sx={{
              fontFamily: "Commissioner",
              padding: "0.75rem 2rem",
              fontSize: "1.25rem",
              backgroundColor: "#D1D6F5",
              color: "#3B447A",
              textTransform: "none",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "#3B447A",
                color: 'white'
              },
            }}
            onClick={handlePrev}
            startIcon={<ArrowBackIcon />}
            >
            Back
          </Button>
        </motion.div>
        }
        <div className="mx-4">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </div>
        {handleNext && <motion.div whileHover={{
          scale: 1.1
        }}>
          <Button
            variant="contained"
            sx={{
              fontFamily: "Commissioner",
              padding: "0.75rem 2rem",
              fontSize: "1.25rem",
              backgroundColor: "#DEDA6D",
              color: "#3B447A",
              textTransform: "none",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "#3B447A",
                color: "white",
              },
            }}
            onClick={handleNext}
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </Button>
        </motion.div>
        }
      </div>
  );
  }
};

export default NavigationButtons;
