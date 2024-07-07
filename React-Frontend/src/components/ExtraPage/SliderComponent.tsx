import React from "react";
import { Slider } from "@mui/material";

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
    <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Alegreya" }}>
      {label} <span className="text-red-500">*</span>
    </h1>
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
