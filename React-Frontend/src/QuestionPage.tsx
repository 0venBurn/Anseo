import React, { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  Slider,
  FormControl,
  InputLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import ProgressIndicator from "./components/ProgressIndicator";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import "./index.css";

const QuestionPage: React.FC = () => {
  const [businessType, setBusinessType] = useState<string | null>(null);
  const [openHour, setOpenHour] = useState<number>(8); // Default to 8 AM
  const [closeHour, setCloseHour] = useState<number>(18); // Default to 6 PM
  const [budget, setBudget] = useState<number>(20); // Default budget value

  const currentStep = 2;
  const totalSteps = 6;

  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to the next page with state
    navigate("/target", {
      state: {
        businessType,
        openHour,
        closeHour,
        budget,
      },
    });
  };

  const handleBusinessTypeSelect = (event: any) => {
    const selectedOption = event.target.value;
    setBusinessType(`Industry_${selectedOption}`);
  };

  const businessOptions = [
    "Amusement Arcade",
    "Amusement Device Permanent",
    "Amusement Device Portable",
    "Amusement Device Temporary",
    "Auction House Premises",
    "Auctioneer",
    "Bingo Game Operator",
    "Booting Company",
    "Cabaret",
    "Car Wash",
    "Catering Establishment",
    "Commercial Lessor",
    "Construction Labor Provider",
    "Dealer In Products",
    "Debt Collection Agency",
    "Electronic & Appliance Service",
    "Electronic Cigarette Dealer",
    "Electronics Store",
    "Employment Agency",
    "Games of Chance",
    "Gaming Cafe",
    "Garage",
    "Garage and Parking Lot",
    "General Vendor",
    "General Vendor Distributor",
    "Home Improvement Contractor",
    "Home Improvement Salesperson",
    "Horse Drawn Cab Owner",
    "Horse Drawn Driver",
    "Laundries",
    "Laundry",
    "Laundry Jobber",
    "Locksmith",
    "Locksmith Apprentice",
    "Motion Picture Projectionist",
    "Newsstand",
    "Parking Lot",
    "Pawnbroker",
    "Pedicab Business",
    "Pedicab Driver",
    "Pool or Billiard Room",
    "Process Server Individual",
    "Process Serving Agency",
    "Scale Dealer Repairer",
    "Scrap Metal Processor",
    "Secondhand Dealer - Auto",
    "Secondhand Dealer - Firearms",
    "Secondhand Dealer - General",
    "Sidewalk Cafe",
    "Sightseeing Bus",
    "Sightseeing Guide",
    "Special Sale",
    "Stoop Line Stand",
    "Storage Warehouse",
    "Third Party Food Delivery",
    "Ticket Seller",
    "Ticket Seller Business",
    "Tobacco Retail Dealer",
    "Tow Truck Company",
    "Tow Truck Driver",
    "Tow Truck Exemption",
  ];

  return (
    <>
      <Header />
      <div className="relative flex flex-col items-center justify-between text-black bg-gray-100 min-h-screen content-container">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center px-4 md:px-10 flex-grow "
        >
          <div className="flex flex-col items-center justify-center flex-grow">
            {/* Question 1: Business Type */}
            <div className="mb-10 w-full max-w-md">
              <h1
                className="text-3xl font-bold mb-6"
                style={{ fontFamily: "Alegreya" }}
              >
                1. What type of business are you planning to start?{" "}
                <span className="text-red-500">*</span>
              </h1>
              <FormControl fullWidth>
                <InputLabel>Business Type</InputLabel>
                <Select
                  value={
                    businessType ? businessType.replace("Industry_", "") : ""
                  }
                  onChange={handleBusinessTypeSelect}
                  label="Business Type"
                >
                  {businessOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Question 2: Operating Hours */}
            <div className="mb-10 w-full max-w-md">
              <h1
                className="text-3xl font-bold mb-6"
                style={{ fontFamily: "Alegreya" }}
              >
                2. Operating hours: <span className="text-red-500">*</span>
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Opens at:</label>
                  <Select
                    value={openHour}
                    onChange={(e) =>
                      setOpenHour(parseInt(String(e.target.value)))
                    }
                    className="w-full rounded-lg py-2 px-4 text-xl font-bold border-2 bg-white"
                  >
                    {[...Array(24).keys()].map((hour) => (
                      <MenuItem key={hour} value={hour}>
                        {hour}:00
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block mb-2">Closes at:</label>
                  <Select
                    value={closeHour}
                    onChange={(e) =>
                      setCloseHour(parseInt(String(e.target.value)))
                    }
                    className="w-full rounded-lg py-2 px-4 text-xl font-bold border-2 bg-white"
                  >
                    {[...Array(24).keys()].map((hour) => (
                      <MenuItem key={hour} value={hour}>
                        {hour}:00
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            {/* Question 3: Budget for Paying Employees */}
            <div className="mb-10 w-full max-w-md">
              <h1
                className="text-3xl font-bold mb-6"
                style={{ fontFamily: "Alegreya" }}
              >
                3. What is your budget for paying employees? (Specify hourly
                rates) <span className="text-red-500">*</span>
              </h1>
              <Slider
                value={budget}
                onChange={(e, newValue) => setBudget(newValue as number)}
                valueLabelDisplay="off"
                min={10}
                max={35}
                step={1}
                marks={[
                  { value: 10, label: "< $10" },
                  { value: 35, label: "$35" },
                ]}
                className="w-full max-w-md"
              />
            </div>
          </div>

          {/* Navigation Buttons and Progress Indicator */}
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

export default QuestionPage;
