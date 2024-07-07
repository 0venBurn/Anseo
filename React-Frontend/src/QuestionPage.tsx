// Question page one that deals with the questions regarding:
// business type
// operating hours
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import BusinessTypeSelector from "./components/QuestionsPage/BusinessTypeSelector";
import OperatingHoursSelector from "./components/QuestionsPage/OperatingHourSelect";
import BudgetSlider from "./components/QuestionsPage/BudgetSlider";
import NavigationButtons from "./components/QuestionsPage/NavigationButtons";
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
            <div className="mt-10  w-full">
              <BusinessTypeSelector
                businessType={businessType}
                handleBusinessTypeSelect={handleBusinessTypeSelect}
                businessOptions={businessOptions}
              />
            </div>
            <div className="mt-10  w-full">
              <OperatingHoursSelector
                openHour={openHour}
                closeHour={closeHour}
                setOpenHour={setOpenHour}
                setCloseHour={setCloseHour}
              />
            </div>
            <div className="mt-10  w-full">
              <BudgetSlider budget={budget} setBudget={setBudget} />
            </div>
          </div>
          <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
          />
        </motion.div>
      </div>
    </>
  );
};

export default QuestionPage;
