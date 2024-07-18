import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import QuestionLabel from "../Questionnaire/QuestionLabel";

interface BusinessTypeSelectorProps {
  businessType: string | null;
  handleBusinessTypeSelect: (event: any) => void;
  businessOptions: string[];
}

const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({
  businessType,
  handleBusinessTypeSelect,
  businessOptions,
}) => {
  return (
    <div className="mb-6 w-full max-w-md">
      <QuestionLabel label="What type of business are you planning to start?" />
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
};

export default BusinessTypeSelector;
