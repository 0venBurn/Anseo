// components/MainContent.tsx

import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center mt-32">
      <h1
        className="text-4xl font-bold mb-4"
        style={{ fontFamily: "Alegreya" }}
      >
        Are you satisfied with your selections and ready to submit your
        preferences?
      </h1>
      <p className="text-2xl mb-6">
        Discover your ideal business location in New York
        <br />
        with tailored solutions for your unique business needs.
      </p>
      <div className="w-full flex justify-center items-center py-4">
        <Button
          variant="contained"
          color="error"
          sx={{
            backgroundColor: "#F15C50",
            color: "white",
            borderRadius: "5px",
            padding: "0.75rem 3rem",
          }}
          onClick={() => navigate("/map")}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MainContent;
