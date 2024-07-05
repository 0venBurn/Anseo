import React from "react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <div className="flex space-x-2">
      {steps.map((step) => (
        <div
          key={step}
          className={`w-4 h-4 rounded-full border-2 ${
            step <= currentStep
              ? "bg-primary-dark border-primary-dark"
              : "border-primary-dark"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
