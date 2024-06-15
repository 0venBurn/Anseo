import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Header Component
 *
 * This component renders the Header component.
 * With a background color and to styled buttons for sign and login redirection
 *
 *
 * Returns a Header component to navigate to the login and sign up page
 */

// Declare component
const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-4 right-10 flex space-x-4">
      <Button
        variant="outlined"
        sx={{
          borderColor: "white",
          color: "white",
          borderRadius: "20px",
          padding: "0.25rem 1rem",
        }}
        onClick={() => navigate("/login")}
      >
        Log in
      </Button>
      <Button
        variant="contained"
        color="error"
        sx={{ backgroundcolor: "red", color: "white", borderRadius: "5px" }}
        onClick={() => navigate("/signin")}
      >
        Sign up
      </Button>
    </div>
  );
};

export default Header;
