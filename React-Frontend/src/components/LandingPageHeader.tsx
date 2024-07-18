import React from "react";
import LoginBtn from "./Navigation/LoginBtn";
import SignUpBtn from "./Navigation/SignUpBtn";
import { motion } from "framer-motion";

/**
 * Header Component
 *
 * This component renders the Header component.
 * It includes styled buttons for navigating to the login and sign-up pages.
 *
 *
 * @returns The Landing Page Header component
 */

// Declare component
const LandingPageHeader: React.FC = () => {
  return (
    // Container div for the header buttons with absolute positioning and spacing
    <div className="flex py-8 items-center w-full">
      <motion.div
        whileHover={{
          color: "#fef840"
        }}
        className="text-4xl md:text5-xl font-bold flex-1 justify-self-start text-center"
        style={{ fontFamily: "Fredoka One", color: "#DEDA6D" }}
        >
        <h1 className="text-center">ANSEO</h1>
      </motion.div>
      <div className="flex items-center justify-end flex-grow flex-shrink basis-0 gap-4 px-2 md:px-20">
        {/* "Log in" button */}
        <LoginBtn />
        <SignUpBtn />
      </div>
    </div>
  );
};

export default LandingPageHeader;
