import React from "react";
import { FormControl, TextField } from "@mui/material";
import QuestionLabel from "./QuestionLabel";

interface BusinessTypeSelectorProps {
  handleBusinessTypeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  questionNumber: number;
}

const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({
  handleBusinessTypeInput,
  questionNumber,
}) => {
  return (
    <div className="mb-6 ">
      <QuestionLabel label="What type of business are you planning to start?" questionNumber={questionNumber} />
      <FormControl className="w-[75%] lg:w-[65%]">
        <TextField 
        onInput={handleBusinessTypeInput}
        sx={{
          color: "#3B447A",
          "&:MuiInputBase-root": {
            fontFamily: "Commissioner",
            color: "#3B447A",
          },
          borderColor: "#3B447A",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#3B447A",
            },
            "&:hover fieldset": {
              borderColor: "#3B447A",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#3B447A",
            },
          },
        }}className="h-40 text-2xl bg-bk-grey outline-none border-4 border-primary-text-dark"/>
      </FormControl>
    </div>
  );
};

export default BusinessTypeSelector;
