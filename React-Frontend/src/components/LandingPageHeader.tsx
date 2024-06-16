import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Header Component
 *
 * This component renders the Header component.
 * It includes styled buttons for navigating to the login and sign-up pages.
 *
 *
 * @returns The Header component
 */

// Declare component
const Header: React.FC = () => {
  // useNavigate is a hook from the react-router-dom for programmatic navigation
  const navigate = useNavigate();

  return (
    // Container div for the header buttons with absolute positioning and spacing
    <div className="absolute top-4 right-10 flex space-x-4">
      {/* "Log in" button */}
      <Button
        variant="outlined"
        sx={{
          borderColor: "white", // White border colour
          color: "white", // White text colour
          borderRadius: "20px", // Rounded corner
          padding: "0.25rem 1rem", // Padding inside the button
        }}
        onClick={() => navigate("/login")} // Navigate to log in on click
      >
        Log in
      </Button>
      {/* "Sign up" button */}
      <Button
        variant="contained"
        color="error" // Red Colour
        sx={{ backgroundcolor: "red", color: "white", borderRadius: "5px" }}
        // backroundcolor: redbackground colour
        // color: White text colour
        // borderRadius: Rounded corners
        onClick={() => navigate("/signin")} // Navigate to sign in on click
      >
        Sign up
      </Button>
    </div>
  );
};

export default Header;
