import React from "react";
import { Slider } from "@mui/material";

interface ImportanceSliderComponentProps {
  value: number;
  setValue: (value: number) => void;
  label: string;
}

const ImportanceSlider: React.FC<ImportanceSliderComponentProps> = ({
  value,
  setValue,
  label,
}) => (
  <div className="mb-10">
    <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Alegreya" }}>
      How important is {label}? <span className="text-red-500">*</span>
    </h1>
    <Slider
      value={value}
      onChange={(e, newValue) => setValue(newValue as number)}
      valueLabelDisplay="off"
      min={0}
      max={1}
      step={0.01}
      marks={[
        { value: 0, label: "Not important" },
        { value: 1, label: "Important" },
      ]}
      className="w-full max-w-md"
    />
  </div>
);

export default ImportanceSlider;
