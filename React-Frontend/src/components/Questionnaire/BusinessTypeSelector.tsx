import React from "react";
import QuestionLabel from "./QuestionLabel";

interface BusinessTypeSelectorProps {
  handleBusinessTypeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  questionNumber: number;
}

const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({
  handleBusinessTypeInput,
  questionNumber,
}) => {
  return (
    <div className="mb-6 ">
      <QuestionLabel label="What type of business are you planning to start?" questionNumber={questionNumber} />
    <input 
    type="text"
    placeholder="Enter your business type..."
    className="w-5/6 bg-bk-grey outline-none font-commissioner md:text-2xl border-b-2
     border-primary-text-dark text-primary-dark pb-2"
     onChange={handleBusinessTypeInput}/>
    </div>
  );
};

export default BusinessTypeSelector;
