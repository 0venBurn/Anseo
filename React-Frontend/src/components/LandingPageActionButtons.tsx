import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * ActionButtons Component
 *
 * This component renders two action buttons:
 * 1. A "Start Now" button that navigates to the "/welcome" page.
 * 2. An "About" button that navigates to the "/about" page.
 *
 * The buttons are styled using Material-UI and the sx prop for custom styles.
 *
 * @returns The ActionButtons component.
 */

const ActionButtons: React.FC = () => {
  const navigate = useNavigate();
  // useNavigate is a hook from react-router-dom for navigation to different pages or programs

  return (
    // Container div for the action buttons with utility classes for styling
    <div className="relative z-10 flex space-x-4 mt-10">
      <Button
        variant="contained"
        sx={{
          fontFamily: "DM Mono",
          backgroundColor: "yellow", // Red background colour
          color: "black", // White text colour
          borderRadius: "50px", // Rounded Corners
          padding: "0.5rem 2rem", // Padding inside the button
        }}
        onClick={() => navigate("/welcome")} // Navigate to welcome on click
      >
        Start Now
      </Button>
      <Button
        variant="outlined"
        sx={{
          fontFamily: "DM Mono",
          borderColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white border
          color: "black", // Black text colour
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white background
          padding: "0.5rem 2rem", // Padding inside the button
          backdropFilter: "blur(5px)", // Blur effect on the background
        }}
        onClick={() => navigate("/about")} // Navigate to about on click
      >
        About
      </Button>
    </div>
  );
};

export default ActionButtons;
