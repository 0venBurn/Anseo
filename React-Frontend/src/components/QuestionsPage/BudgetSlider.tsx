import React from "react";
import { Slider } from "@mui/material";

interface BudgetSliderProps {
  budget: number;
  setBudget: (budget: number) => void;
}

const BudgetSlider: React.FC<BudgetSliderProps> = ({ budget, setBudget }) => (
  <div className="mb-10 w-full max-w-md">
    <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Alegreya" }}>
      3. What is your budget for paying employees? (Specify hourly rates){" "}
      <span className="text-red-500">*</span>
    </h1>
    <Slider
      value={budget}
      onChange={(e, newValue) => setBudget(newValue as number)}
      valueLabelDisplay="off"
      min={10}
      max={35}
      step={1}
      marks={[
        { value: 10, label: "< $10" },
        { value: 35, label: "$35" },
      ]}
      className="w-full max-w-md"
    />
  </div>
);

export default BudgetSlider;
