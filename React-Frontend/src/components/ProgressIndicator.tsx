import React from "react";

/**
 * ProgressIndicator component that contains the progress indicators at the bottom of the page.
 */

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
    <div className="absolute bottom-10 flex space-x-2">
      {steps.map((step) => (
        <div
          key={step}
          className={`w-3 h-3 rounded-full ${step <= currentStep ? "bg-purple-900" : "bg-gray-300"}`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
