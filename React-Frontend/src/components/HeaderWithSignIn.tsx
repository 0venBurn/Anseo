import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Header component that contains the logo and navigation buttons.
 *
 * USED ON WELCOME PAGE, LOGIN PAGE, SIGN UP PAGE
 */

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-purple-900 text-white flex justify-between items-center py-4 px-10">
      {/* Logo that navigates to the home page */}
      <div
        className="text-5xl font-bold text-orange-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        ANSEO
      </div>
      <div className="flex space-x-4">
        {/* Log In button */}
        <Button
          variant="outlined"
          sx={{
            borderColor: "white",
            color: "white",
            borderRadius: "20px",
            padding: "0.25rem 1rem",
            boxShadow: "none",
          }}
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
        {/* Sign Up button */}
        <Button
          variant="contained"
          color="error"
          sx={{
            backgroundColor: "red",
            color: "white",
            borderRadius: "5px",
            boxShadow: "none",
          }}
          onClick={() => navigate("/signin")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Header;
