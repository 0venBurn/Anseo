// components/BackButton.tsx

import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  path: string;
}

const BackButton: React.FC<BackButtonProps> = ({ path }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      sx={{
        fontSize: "1.25rem",
        padding: "0.75rem 2rem",
        backgroundColor: "#f8b0a9",
        color: "black",
        borderRadius: "50px",
        "&:hover": {
          backgroundColor: "#f89a93",
        },
      }}
      onClick={() => navigate(path)}
      startIcon={<ArrowBackIcon />}
    >
      Back
    </Button>
  );
};

export default BackButton;
