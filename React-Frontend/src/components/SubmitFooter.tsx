// components/Footer.tsx

import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute bottom-10 flex space-x-2 items-center w-full justify-center">
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
          marginRight: "20px",
        }}
        onClick={() => navigate("/borough")}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
      <div className="flex space-x-2 ml-4">
        <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
        <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
        <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
        <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
      </div>
    </div>
  );
};

export default Footer;
