// Header.tsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SignUpBtn from "../Navigation/SignUpBtn";
import LoginBtn from "../Navigation/LoginBtn";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="sticky z-40 top-0 min-h-20 left-0 w-full bg-primary-dark text-white flex justify-between flex-none items-center py-4 px-4 md:px-20 shadow-md">
        <div className="flex">
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
          <LoginBtn />
          <SignUpBtn />
        </div>
          </SignedOut>
      </div>      
    </>
  );
};

export default Header;
