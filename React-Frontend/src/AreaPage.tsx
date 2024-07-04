import React, { useState } from "react";
import { Button, Slider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProgressIndicator from "./components/ProgressIndicator";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import "./index.css";

const currentStep = 3;
const totalSteps = 6;

const AreaPage: React.FC = () => {
  const location = useLocation();
  const {
    businessType,
    openHour,
    closeHour,
    budget,
    selectedAgeGroup,
    ageImportance,
    selectedIncomeLevel,
    incomeImportance,
    targetGroup,
  } = location.state || {};
  const [proximityImportance, setProximityImportance] = useState<number>(0.5);
  const [footfallImportance, setFootfallImportance] = useState<number>(0.5);
  const [surroundingBusinessesImportance, setSurroundingBusinessesImportance] =
    useState<number>(0.5);
  const [rentBudget, setRentBudget] = useState<number>(2500); // Default budget value
  const navigate = useNavigate();

  const handleNext = () => {
    // Calculate the adjusted rent budget
    const adjustedRentBudget = rentBudget / 5;

    // Navigate to the next page with state
    navigate("/extra", {
      state: {
        businessType,
        openHour,
        closeHour,
        budget,
        selectedAgeGroup,
        ageImportance,
        selectedIncomeLevel,
        incomeImportance,
        targetGroup,
        proximityImportance,
        footfallImportance,
        surroundingBusinessesImportance,
        rentBudget: adjustedRentBudget,
      },
    });
  };

  return (
    <>
      <Header />
      <div className="relative h-full flex flex-col items-center justify-center text-black bg-gray-100">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mt-24 px-4 md:px-10 flex-grow md:mt-32"
        >
          {/* Question 1: Proximity to Public Transportation */}
          <div className="mb-10">
            <h1
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: "Alegreya" }}
            >
              How important is proximity to public transportation for your
              business? <span className="text-red-500">*</span>
            </h1>
            <Slider
              value={proximityImportance}
              onChange={(e, newValue) =>
                setProximityImportance(newValue as number)
              }
              valueLabelDisplay="off"
              min={0}
              max={1}
              step={0.01}
              marks={[
                { value: 0, label: "Not important" },
                { value: 1, label: "Important" },
              ]}
              className="w-full max-w-md"
            />
          </div>

          {/* Question 2: High Footfall */}
          <div className="mb-10">
            <h1
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: "Alegreya" }}
            >
              How important is high footfall?{" "}
              <span className="text-red-500">*</span>
            </h1>
            <Slider
              value={footfallImportance}
              onChange={(e, newValue) =>
                setFootfallImportance(newValue as number)
              }
              valueLabelDisplay="off"
              min={0}
              max={1}
              step={0.01}
              marks={[
                { value: 0, label: "Not important" },
                { value: 1, label: "Important" },
              ]}
              className="w-full max-w-md"
            />
          </div>

          {/* Question 3: Surrounding Businesses */}
          <div className="mb-10">
            <h1
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: "Alegreya" }}
            >
              How important is being surrounded by similar businesses?{" "}
              <span className="text-red-500">*</span>
            </h1>
            <Slider
              value={surroundingBusinessesImportance}
              onChange={(e, newValue) =>
                setSurroundingBusinessesImportance(newValue as number)
              }
              valueLabelDisplay="off"
              min={0}
              max={1}
              step={0.01}
              marks={[
                { value: 0, label: "Not important" },
                { value: 1, label: "Important" },
              ]}
              className="w-full max-w-md"
            />
          </div>

          {/* Question 4: Budget for Monthly Rent */}
          <div className="mb-10">
            <h1
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: "Alegreya" }}
            >
              What is your budget for monthly rent (including utilities) for
              your business location? <span className="text-red-500">*</span>
            </h1>
            <Slider
              value={rentBudget}
              onChange={(e, newValue) => setRentBudget(newValue as number)}
              valueLabelDisplay="off"
              min={1000}
              max={5000}
              step={100}
              marks={[
                { value: 1000, label: "< $1000" },
                { value: 5000, label: "$5000" },
              ]}
              className="w-full max-w-md"
            />
          </div>
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
        </motion.div>
      </div>
    </>
  );
};

export default AreaPage;
