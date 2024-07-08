import React from "react";

interface QuestionLabelProps {
    label: string;
}

const QuestionLabel: React.FC<QuestionLabelProps> = ({ label }) => {
    return (
    <h1 className="text-3xl mb-6 font-commissioner">
        {label}
      </h1>)
}

export default QuestionLabel;