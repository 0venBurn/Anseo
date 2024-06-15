import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * ActionButton component that contains the main call-to-action button.
 */
const ActionButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center items-center py-4">
      {/* Next button */}
      <Button
        variant="contained"
        color="error"
        sx={{
          backgroundColor: "#F15C50",
          color: "white",
          borderRadius: "5px",
          padding: "0.75rem 3rem",
          boxShadow: "none",
        }}
        onClick={() => navigate("/questions")}
      >
        Next
      </Button>
    </div>
  );
};

export default ActionButton;
