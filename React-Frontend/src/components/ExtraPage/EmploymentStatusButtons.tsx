import React, { useState } from "react";
import QuestionLabel from "../Questionnaire/QuestionLabel";

interface EmploymentStatusButtonsProps {
  value: string[];
  setValue: (value: string[]) => void;
}

const EmploymentStatusButtons: React.FC<EmploymentStatusButtonsProps> = ({
  value,
  setValue,
}) => {
  const options = ["Full Time", "Part Time", "No Preference"];

  const handleSelection = (option: string) => {
    if (option === "No Preference") {
      setValue([option]);
    } else {
      let newValue = [...value];
      if (newValue.includes(option)) {
        newValue = newValue.filter((item) => item !== option);
      } else {
        newValue = newValue.filter((item) => item !== "No Preference");
        newValue.push(option);
      }
      setValue(newValue);
    }
  };

  return (
    <div className="mb-10">
      <QuestionLabel label="What type of employment status are you looking to offer?" />
      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option}
            className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
              value.includes(option)
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

export default EmploymentStatusButtons;
