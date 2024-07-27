import React from "react";
import LoginBtn from "../Navigation/LoginBtn";
import SignUpBtn from "../Navigation/SignUpBtn";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
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
    <div className="flex py-8 items-center justify-around w-full">
      <motion.div
        whileHover={{
          color: "#fef840"
        }}
        className="text-4xl md:text5-xl font-bold text-center px-4 md:w-full"
        style={{ fontFamily: "Fredoka One", color: "#DEDA6D" }}
        >
        <h1 className="text-center">ANSEO</h1>
      </motion.div>
      <div className="self-end flex items-center w-full justify-end md:gap-4 px-2 ">
      <SignedIn>
        <div className="px-4 md:px-20">
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "w-12 h-12",
                userButtonPopoverMain: "font-inter",
              }
            }} 
            />
            </div>
        </SignedIn>
        <SignedOut>
        <div className="flex space-x-4 md:px-16 items-center">
          <LoginBtn />
          <SignUpBtn />
        </div>
          </SignedOut>
      </div>
    </div>
  );
};

export default LandingPageHeader;
