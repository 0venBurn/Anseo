// components/NavigationButtons.tsx

import React from "react";
import BackButton from "./BackButton";
import NextButton from "./NextButton";

interface NavigationButtonsProps {
  backPath: string;
  nextPath: string;
  showNext?: boolean; // Optional prop to show/hide the Next button
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  backPath,
  nextPath,
  showNext = true,
}) => {
  return (
    <div className="flex justify-between w-full mt-10 px-80">
      <BackButton path={backPath} />
      {showNext && <NextButton path={nextPath} />}
    </div>
  );
};

export default NavigationButtons;
