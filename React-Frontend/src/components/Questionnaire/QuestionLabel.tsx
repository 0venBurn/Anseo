import React from "react";

interface QuestionLabelProps {
  label: string;
  questionNumber: number;
}

const QuestionLabel: React.FC<QuestionLabelProps> = ({ label, questionNumber }) => {
    return (
    <h1 className="text-xl md:text-3xl mb-6 lg:mb-12 font-light font-commissioner">
      <span className="font-bold">Question {questionNumber}:</span> {label}
      </h1>)
}

export default QuestionLabel;
