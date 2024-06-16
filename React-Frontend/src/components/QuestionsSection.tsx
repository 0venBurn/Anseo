// components/QuestionSection.tsx

import React from "react";

interface Option {
  label: string;
  icon: JSX.Element;
}

interface QuestionSectionProps {
  title: string;
  selected: string[];
  handleSelect: (option: string) => void;
  options: Option[];
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  title,
  selected,
  handleSelect,
  options,
}) => {
  return (
    <div className="flex flex-col items-center text-center mt-12 px-10">
      <h1
        className="text-3xl font-bold mb-10"
        style={{ fontFamily: "Alegreya" }}
      >
        {title} <span className="text-red-500">*</span>
      </h1>
      <div className="grid grid-cols-2 gap-4 mb-10">
        {options.map((option) => (
          <button
            key={option.label}
            className={`w-48 h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
              selected.includes(option.label)
                ? "bg-purple-900 text-white"
                : "bg-transparent text-purple-900"
            }`}
            onClick={() => handleSelect(option.label)}
          >
            {option.icon}
            <span className="ml-2">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionSection;
