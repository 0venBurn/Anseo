import React from "react";
import QuestionLabel from "./QuestionLabel";

interface AreaTypeSelectorProps {
  areaType: string[];
  handleSelectAreaType: (types: string[]) => void;
  questionNumber: number;
}

const AreaTypeSelector: React.FC<AreaTypeSelectorProps> = ({
  areaType,
  handleSelectAreaType,
  questionNumber
}) => {
  const options = ["Residential", "Business oriented", "No preference"];

  const handleSelection = (type: string) => {
    if (type === "No preference") {
      handleSelectAreaType(["No preference"]);
    } else {
      const newAreaType = areaType.includes(type)
        ? areaType.filter((item) => item !== type)
        : [...areaType.filter((item) => item !== "No preference"), type];
      handleSelectAreaType(newAreaType);
    }
  };

  return (
    <div className="mb-6 ">
      <QuestionLabel label="What type of area would you like to set up in?" questionNumber={questionNumber} />
      <div className="grid place-items-center grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full whitespace-nowrap">
        {options.map((option) => (
          <button
            key={option}
            className={`w-[50%] md:w-[100%] py-4 px-8 rounded-lg md:text-xl font-bold flex items-center justify-center border-2 ${
              areaType.includes(option) ||
              (option === "No preference" &&
                areaType.length === 1 &&
                areaType[0] === "No preference")
                ? "bg-primary-dark text-white"
                : "bg-primary-light primary-text-dark"
            }`}
            onClick={() => handleSelection(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AreaTypeSelector;
