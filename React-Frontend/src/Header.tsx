// Header.tsx
import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery, useTheme } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SignUpBtn from "./components/Navigation/SignUpBtn";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full bg-primary-dark text-white flex justify-between items-center py-4 px-4 md:px-20 z-10">
        <div className="flex items-center">
          <motion.div
            whileHover={{
              color: "#fef840"
            }}
            className="text-3xl md:text-5xl font-bold cursor-pointer"
            style={{ fontFamily: "Fredoka One", color: "#DEDA6D" }}
            onClick={() => navigate("/")}
          >
            ANSEO
          </motion.div>
          <div className="hidden md:flex space-x-4 ml-4 items-center">
          </div>
        </div>
        <SignedIn>
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "w-12 h-12",
                userButtonPopoverMain: "font-inter",
              }
            }} 
          />
        </SignedIn>
        <SignedOut>
        <div className="flex space-x-4 items-center">
          <Button
            variant="outlined"
            sx={{
              borderColor: "white",
              color: "white",
              borderRadius: "20px",
              padding: isMobile ? "0.15rem 0.75rem" : "0.25rem 1rem",
              boxShadow: "none",
              fontSize: isMobile ? "0.75rem" : "1rem",
            }}
            onClick={() => navigate("/sign-in")}
          >
            Log In
          </Button>
          <SignUpBtn />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#DEDA6D",
              color: "#3B447A",
              borderRadius: "20px",
              boxShadow: "none",
              fontSize: isMobile ? "0.75rem" : "1rem",
            }}
            onClick={() => navigate("/sign-up")}
            >
            Sign Up
          </Button>
          {isMobile && (
            <IconButton color="inherit" onClick={handleMenuToggle}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </div>
          </SignedOut>
      </div>

      {/* Mobile Menu animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-blue-900 text-white flex flex-col items-center py-4 z-10"
          >
            <Button
              variant="text"
              sx={{ color: "white", fontSize: "1rem" }}
              onClick={() => {
                navigate("/about");
                setMenuOpen(false);
              }}
            >
              About
            </Button>
            <Button
              variant="text"
              sx={{ color: "white", fontSize: "1rem" }}
              onClick={() => {
                navigate("/link1");
                setMenuOpen(false);
              }}
            >
              Link 1
            </Button>
            <Button
              variant="text"
              sx={{ color: "white", fontSize: "1rem" }}
              onClick={() => {
                navigate("/link2");
                setMenuOpen(false);
              }}
            >
              Link 2
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
