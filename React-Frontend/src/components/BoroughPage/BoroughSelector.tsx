import React from "react";
import QuestionLabel from "../Questionnaire/QuestionLabel";

interface BoroughSelectorProps {
  selectedBoroughs: string[];
  handleSelectBorough: (boroughs: string[]) => void;
  questionNumber: number;
}

const BoroughSelector: React.FC<BoroughSelectorProps> = ({
  selectedBoroughs,
  handleSelectBorough,
  questionNumber
}) => {
  const allBoroughs = [
    "Manhattan",
    "Brooklyn",
    "Queens",
    "Bronx",
    "Staten Island",
  ];
  const options = [...allBoroughs, "No preference"];

  const handleSelection = (borough: string) => {
    if (borough === "No preference") {
      handleSelectBorough(["No preference"]);
    } else {
      const newSelectedBoroughs = selectedBoroughs.includes(borough)
        ? selectedBoroughs.filter((item) => item !== borough)
        : [
            ...selectedBoroughs.filter((item) => item !== "No preference"),
            borough,
          ];
      handleSelectBorough(newSelectedBoroughs);
    }
  };

  return (
    <div className="mb-6 ">
      <QuestionLabel label="Which boroughs are you most interested in for your business location?" questionNumber={questionNumber} />
      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full whitespace-nowrap">
        {options.map((option) => (
          <button
            key={option}
            className={`w-[50%] md:w-[75%] py-4 px-8 rounded-lg md:text-xl font-bold flex items-center justify-center border-2 ${
              selectedBoroughs.includes(option) ||
              (option === "No preference" &&
                selectedBoroughs.length === 1 &&
                selectedBoroughs[0] === "No preference")
                ? "bg-primary-dark text-white"
                : "bg-primary-light text-primary-text-dark"
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

export default BoroughSelector;
