// components/Header.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-purple-900 text-white flex justify-between items-center py-4 px-10 absolute top-0 left-0">
      <div
        className="text-5xl font-bold text-orange-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        ANSEO
      </div>
      <div className="flex space-x-4">
        <button
          className="text-2xl font-bold"
          onClick={() => navigate("/about")}
        >
          ABOUT
        </button>
        <IconButton color="inherit" onClick={() => navigate("/login")}>
          <AccountCircle />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
