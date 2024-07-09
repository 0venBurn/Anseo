// Question page one that deals with the questions regarding:
// business type
// operating hours
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BusinessTypeSelector from "./components/QuestionsPage/BusinessTypeSelector";
import OperatingHoursSelector from "./components/QuestionsPage/OperatingHourSelect";
import BudgetSlider from "./components/QuestionsPage/BudgetSlider";
import NavigationButtons from "./components/QuestionsPage/NavigationButtons";
import "./index.css";
import QuestionnaireLayout from "./layouts/QuestionnaireLayout";
// import SelectBox from "./components/Questionnaire/SelectBox";
import { useQuestionnaire } from "./context/QuestionnaireProvider";

const QuestionPage: React.FC = () => {
  const [businessType, setBusinessType] = useState<string>("");
  const [openHour, setOpenHour] = useState<number>(8); // Default to 8 AM
  const [closeHour, setCloseHour] = useState<number>(18); // Default to 6 PM
  const [budget, setBudget] = useState<number>(20); // Default budget value
  const { data, answerQuestion } = useQuestionnaire();

  const currentStep = 2;
  const totalSteps = 6;

  const navigate = useNavigate();

  const handleNext = () => {
    answerQuestion("businessType", businessType);
    answerQuestion("openHour", openHour);
    answerQuestion("closeHour", closeHour);
    answerQuestion("budget", budget);
    navigate("/target");
  };

  const handlePrev = () => {
    answerQuestion("businessType", businessType);
    answerQuestion("openHour", openHour);
    answerQuestion("closeHour", closeHour);
    answerQuestion("budget", budget);
    navigate("/welcome");
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
    <QuestionnaireLayout>
      {/* <SelectBox 
               questionLabel='What type of business are you planning to start?'
               inputLabel='Business Type'
               selectBoxLabel='Business Type'
               value={businessType ? businessType.replace("Industry_", "") : ""}
               handleChange={handleBusinessTypeSelect}
               options={businessOptions}
               /> */}
      <div className="mt-10">
        <BusinessTypeSelector
          businessType={businessType}
          handleBusinessTypeSelect={handleBusinessTypeSelect}
          businessOptions={businessOptions}
        />
      </div>
      <div className="mt-10">
        <OperatingHoursSelector
          openHour={openHour}
          closeHour={closeHour}
          setOpenHour={setOpenHour}
          setCloseHour={setCloseHour}
        />
      </div>
      <div className="mt-10">
        <BudgetSlider budget={budget} setBudget={setBudget} />
      </div>
      <div className="absolute bottom-0">
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={totalSteps}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
    </QuestionnaireLayout>
  );
};

export default QuestionPage;
