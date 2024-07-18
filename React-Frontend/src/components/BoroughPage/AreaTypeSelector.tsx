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
      handleSelectAreaType(["No preference"]);
    } else {
      const newAreaType = areaType.includes(type)
        ? areaType.filter((item) => item !== type)
        : [...areaType.filter((item) => item !== "No preference"), type];
      handleSelectAreaType(newAreaType);
    }
  };

  return (
    <div className="mb-10">
      <QuestionLabel label="What type of area would you like to set up in?" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-ful">
        {options.map((option) => (
          <button
            key={option}
            className={`flex-1 h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
              areaType.includes(option) ||
              (option === "No preference" &&
                areaType.length === 1 &&
                areaType[0] === "No preference")
                ? "bg-primary-dark text-white"
                : "bg-transparent text-purple-900"
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
