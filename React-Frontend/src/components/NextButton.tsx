// components/NextButton.tsx

import React from "react";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

interface NextButtonProps {
  path: string;
}

const NextButton: React.FC<NextButtonProps> = ({ path }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      sx={{
        fontSize: "1.25rem",
        padding: "0.75rem 2rem",
        backgroundColor: "#f16449",
        color: "white",
        borderRadius: "50px",
        "&:hover": {
          backgroundColor: "#f14624",
        },
      }}
      onClick={() => navigate(path)}
      endIcon={<ArrowForwardIcon />}
    >
      Next
    </Button>
  );
};

export default NextButton;
