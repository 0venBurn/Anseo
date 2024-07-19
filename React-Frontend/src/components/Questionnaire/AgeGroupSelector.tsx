import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface AgeGroupSelectorProps {
  selectedAgeGroup: string;
  handleAgeGroupSelect: (event: SelectChangeEvent<string>) => void;
  ageOptions: string[];
}

const AgeGroupSelector: React.FC<AgeGroupSelectorProps> = ({
  selectedAgeGroup,
  handleAgeGroupSelect,
  ageOptions,
}) => (
  <div className="mb-10 w-full max-w-md">
    <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Alegreya" }}>
      1. What is your target customer age group?{" "}
      <span className="text-red-500">*</span>
    </h1>
    <FormControl fullWidth>
      <InputLabel>Age Group</InputLabel>
      <Select
        value={selectedAgeGroup}
        onChange={handleAgeGroupSelect}
        label="Age Group"
      >
        {ageOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);

export default AgeGroupSelector;
