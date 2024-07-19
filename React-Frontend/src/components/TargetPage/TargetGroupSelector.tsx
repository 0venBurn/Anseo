import React from "react";
import QuestionLabel from "../Questionnaire/QuestionLabel";

interface TargetGroupSelectorProps {
  targetGroup: string[];
  setTargetGroup: (group: string[]) => void;
  questionNumber: number;
}

const TargetGroupSelector: React.FC<TargetGroupSelectorProps> = ({
  targetGroup,
  setTargetGroup,
  questionNumber
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

  return (
    <div className="mb-6 ">
      <QuestionLabel label="Is your business targeting families, singles, or no preference?" questionNumber={questionNumber} />
      <div className="grid place-items-center grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option}
            className={`w-[50%] md:w-[100%] py-4 px-8 rounded-lg md:text-xl font-bold flex items-center justify-center border-2 ${
              targetGroup.includes(option)
                ? "bg-primary-dark text-white"
                : "bg-primary-light text-primary-text-dark"
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
