import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import QuestionLabel from "../Questionnaire/QuestionLabel";

interface SelectBoxProps {
    questionLabel: string;
    inputLabel: string;
    selectBoxLabel: string;
    value: string;
    handleChange: (event: any) => void;
    options: string[];
}

const SelectBox: React.FC<SelectBoxProps> = ({
    questionLabel,
    inputLabel,
    selectBoxLabel,
    value,
    handleChange,
    options,
}) => (
  <div className="mb-10 w-full max-w-md">
    <QuestionLabel label={questionLabel} />
    <FormControl fullWidth>
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label={selectBoxLabel}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);

export default SelectBox;
