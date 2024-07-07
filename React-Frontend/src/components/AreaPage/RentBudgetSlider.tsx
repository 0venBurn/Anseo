import React from "react";
import { Slider } from "@mui/material";

interface RentBudgetSliderProps {
  value: number;
  setValue: (value: number) => void;
}

const RentBudgetSlider: React.FC<RentBudgetSliderProps> = ({
  value,
  setValue,
}) => (
  <div className="mb-10">
    <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Alegreya" }}>
      What is your budget for monthly rent (including utilities) for your
      business location? <span className="text-red-500">*</span>
    </h1>
    <Slider
      value={value}
      onChange={(e, newValue) => setValue(newValue as number)}
      valueLabelDisplay="off"
      min={1000}
      max={5000}
      step={100}
      marks={[
        { value: 1000, label: "< $1000" },
        { value: 5000, label: "$5000" },
      ]}
      className="w-full max-w-md"
    />
  </div>
);

export default RentBudgetSlider;
