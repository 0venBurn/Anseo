import React from "react";
import QuestionLabel from "../Questionnaire/QuestionLabel";

interface AreaTypeSelectorProps {
  areaType: string[];
  handleSelectAreaType: (types: string[]) => void;
}

const AreaTypeSelector: React.FC<AreaTypeSelectorProps> = ({
  areaType,
  handleSelectAreaType,
}) => {
  const options = ["Residential", "Business oriented", "No preference"];

  const handleSelection = (type: string) => {
    if (type === "No preference") {
      handleSelectAreaType(["Residential", "Business oriented"]);
    } else {
      const newAreaType = areaType.includes(type)
        ? areaType.filter((item) => item !== type)
        : [...areaType.filter((item) => item !== "No preference"), type];
      handleSelectAreaType(newAreaType);
    }
  };

  return (
    <div className="mb-6 w-full max-w-md">
      <QuestionLabel label="What type of area would you like to set up in?" />
      <div className="grid grid-cols-2 gap-4 mb-6 w-full">
        {options.map((option) => (
          <button
            key={option}
            className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
              areaType.includes(option) ||
              (option === "No preference" && areaType.length === 2)
                ? "bg-primary-dark text-white"
                : "bg-transparent text-purple-900"
            }`}
            onClick={() => handleSelection(option)}
          >
            <span className="ml-2">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AreaTypeSelector;
