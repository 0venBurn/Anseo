import React from "react";
import { Slider } from "@mui/material";
import QuestionLabel from "../Questionnaire/QuestionLabel";

interface BudgetSliderProps {
  budget: number;
  setBudget: (budget: number) => void;
}

const BudgetSlider: React.FC<BudgetSliderProps> = ({ budget, setBudget }) => (
  <div className="mb-10 w-full max-w-md">
    <QuestionLabel label="What is your budget for paying employees? (Specify hourly rates)" />
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
