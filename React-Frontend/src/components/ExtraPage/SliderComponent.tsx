import React from "react";
import { Slider } from "@mui/material";
import QuestionLabel from "../Questionnaire/QuestionLabel";

interface SliderComponentProps {
  value: number;
  setValue: (value: number) => void;
  label: string;
  min: number;
  max: number;
  step: number;
  marks: { value: number; label: string }[];
}

const SliderComponent: React.FC<SliderComponentProps> = ({
  value,
  setValue,
  label,
  min,
  max,
  step,
  marks,
}) => (
  <div className="mb-10">
    <QuestionLabel label={label} />
    <Slider
      value={value}
      onChange={(e, newValue) => setValue(newValue as number)}
      valueLabelDisplay="off"
      min={min}
      max={max}
      step={step}
      marks={marks}
      className="w-full max-w-md"
    />
  </div>
);

export default SliderComponent;
