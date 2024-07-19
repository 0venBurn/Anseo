import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import QuestionLabel from "../Questionnaire/QuestionLabel";

interface BusinessTypeSelectorProps {
  businessType: string | null;
  handleBusinessTypeSelect: (event: any) => void;
  businessOptions: string[];
  questionNumber: number;
}

const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({
  businessType,
  handleBusinessTypeSelect,
  businessOptions,
  questionNumber,
}) => {
  return (
    <div className="mb-6 ">
      <QuestionLabel label="What type of business are you planning to start?" questionNumber={questionNumber} />
      <FormControl className="w-[75%] lg:w-[65%]">
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
