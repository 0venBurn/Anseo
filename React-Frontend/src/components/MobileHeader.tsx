import React from "react";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Define the props for the MobileHeader component
interface MobileHeaderProps {
  menuOpen: boolean;
  handleMenuToggle: () => void;
  setMenuOpen: (open: boolean) => void; // Add this line
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  menuOpen,
  handleMenuToggle,
  setMenuOpen,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="md:hidden absolute top-0 left-0 w-full bg-blue-900 text-white flex justify-between items-center py-4 px-4 md:px-20 z-50">
        <div
          className="text-3xl md:text-5xl font-bold cursor-pointer"
          style={{ fontFamily: "Fredoka One", color: "#DEDA6D" }}
          onClick={() => navigate("/")}
        >
          ANSEO
        </div>
        <div className="flex md:hidden space-x-4 items-center">
          <Button
            variant="outlined"
            sx={{
              borderColor: "white",
              color: "white",
              borderRadius: "20px",
              padding: "0.15rem 0.75rem",
              boxShadow: "none",
              fontSize: "0.75rem",
              fontfamily: "Inter, sans-serif",
            }}
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#DEDA6D",
              color: "#3B447A",
              borderRadius: "20px",
              boxShadow: "none",
              fontSize: "0.75rem",
              fontfamily: "Inter, sans-serif",
            }}
            onClick={() => navigate("/signin")}
          >
            Sign Up
          </Button>
          <IconButton color="inherit" onClick={handleMenuToggle}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-blue-900 text-white flex flex-col items-center py-4 z-50"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileHeader;
