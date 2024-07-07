import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface BusinessTypeSelectorProps {
  businessType: string | null;
  handleBusinessTypeSelect: (event: any) => void;
  businessOptions: string[];
}

const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({
  businessType,
  handleBusinessTypeSelect,
  businessOptions,
}) => (
  <div className="mb-10 w-full max-w-md">
    <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Alegreya" }}>
      1. What type of business are you planning to start?{" "}
      <span className="text-red-500">*</span>
    </h1>
    <FormControl fullWidth>
      <InputLabel>Business Type</InputLabel>
      <Select
        value={businessType ? businessType.replace("Industry_", "") : ""}
        onChange={handleBusinessTypeSelect}
        label="Business Type"
      >
        {businessOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);

export default BusinessTypeSelector;
