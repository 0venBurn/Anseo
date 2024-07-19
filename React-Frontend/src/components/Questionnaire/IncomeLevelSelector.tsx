import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface IncomeLevelSelectorProps {
  selectedIncomeLevel: string;
  handleIncomeLevelSelect: (event: SelectChangeEvent<string>) => void;
  incomeOptions: string[];
}

const IncomeLevelSelector: React.FC<IncomeLevelSelectorProps> = ({
  selectedIncomeLevel,
  handleIncomeLevelSelect,
  incomeOptions,
}) => (
  <div className="mb-10 w-full max-w-md">
    <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Alegreya" }}>
      2. What is your target customer income level?{" "}
      <span className="text-red-500">*</span>
    </h1>
    <FormControl fullWidth>
      <InputLabel>Income Level</InputLabel>
      <Select
        value={selectedIncomeLevel}
        onChange={handleIncomeLevelSelect}
        label="Income Level"
      >
        {incomeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option.split("_").slice(-1)[0]} {/* only show the number */}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);

export default IncomeLevelSelector;
