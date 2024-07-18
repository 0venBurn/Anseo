import React from "react";
import QuestionLabel from "../Questionnaire/QuestionLabel";

interface TargetGroupSelectorProps {
  targetGroup: string[];
  setTargetGroup: (group: string[]) => void;
}

const TargetGroupSelector: React.FC<TargetGroupSelectorProps> = ({
  targetGroup,
  setTargetGroup,
}) => {
  const options = ["Families", "Singles", "No Preference"];

  const handleSelection = (option: string) => {
    if (option === "No Preference") {
      setTargetGroup([option]);
    } else {
      let newTargetGroup = [...targetGroup];
      if (newTargetGroup.includes(option)) {
        newTargetGroup = newTargetGroup.filter((item) => item !== option);
      } else {
        newTargetGroup = newTargetGroup.filter(
          (item) => item !== "No Preference",
        );
        newTargetGroup.push(option);
      }
      setTargetGroup(newTargetGroup);
    }
  };

  // <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full">
  //       {options.map((option) => (
  //         <button
  //           key={option}
  //           className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
  //             selectedBoroughs.includes(option) ||
  //             (option === "No preference" &&
  //               selectedBoroughs.length === 1 &&
  //               selectedBoroughs[0] === "No preference")
  //               ? "bg-primary-dark text-white"
  //               : "bg-transparent text-purple-900"
  //           }`}
  //           onClick={() => handleSelection(option)}
  //         >
  //           <span className="ml-2">{option}</span>
  //         </button>
  //       ))}
  //     </div>
  return (
    <div className="mb-6 max-w-2xl">
      <QuestionLabel label="Is your business targeting families, singles, or no preference?" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option}
            className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
              targetGroup.includes(option)
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

export default TargetGroupSelector;
