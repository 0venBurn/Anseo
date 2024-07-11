import React from "react";
import QuestionLabel from "../Questionnaire/QuestionLabel";

interface TargetGroupSelectorProps {
  targetGroup: string | null;
  setTargetGroup: (group: string) => void;
}

const TargetGroupSelector: React.FC<TargetGroupSelectorProps> = ({
  targetGroup,
  setTargetGroup,
}) => (
  <div className="mb-10">
    <QuestionLabel label="Is your business targeting families or singles?" />
    <div className="grid grid-cols-2 gap-4">
      {["Families", "Singles"].map((option) => (
        <button
          key={option}
          className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
            targetGroup === option
              ? "bg-primary-dark text-white"
              : "bg-transparent text-purple-900"
          }`}
          onClick={() => setTargetGroup(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default TargetGroupSelector;
