import React from "react";
import QuestionLabel from "../Questionnaire/QuestionLabel";

interface EmploymentStatusButtonsProps {
  value: string | null;
  setValue: (value: string) => void;
}

const EmploymentStatusButtons: React.FC<EmploymentStatusButtonsProps> = ({
  value,
  setValue,
}) => (
  <div className="mb-10">
    <QuestionLabel label="What type of employment status are you looking to offer?" />
    <div className="grid grid-cols-3 gap-4">
      {["Full Time", "Part Time", "No Earnings"].map((option) => (
        <button
          key={option}
          className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
            value === option
              ? "bg-primary-dark text-white"
              : "bg-transparent text-purple-900"
          }`}
          onClick={() => setValue(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default EmploymentStatusButtons;
