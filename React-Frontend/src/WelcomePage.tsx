// WelcomePage.tsx
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import ProgressIndicator from "./components/ProgressIndicator";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import "./index.css";

// Setting steps for progress indicator button
const currentStep = 1;
const totalSteps = 6;

// Defining functional component of the welcome page
const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      {/* Animated Main Content */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="relative h-screen flex items-start justify-between text-black bg-gray-100"
      >
        {/* Text on main page */}
        <div className="flex flex-col items-start text-left mt-40 ml-20 w-full max-w-full">
          <h1 className="text-indigo-900 text-7xl font-bold font-['Alegreya'] mb-4 whitespace-nowrap">
            Welcome to Anseo, the place to be.
          </h1>
          <p className="text-2xl mb-6 text-indigo-900">
            Discover your ideal business location in New York
            <br />
            with tailored solutions for your unique business needs.
          </p>

          <p className="text-lg mb-6 max-w-2xl text-indigo-900">
            Welcome to Anseo, your gateway to finding the perfect business
            location in New York! We're excited to help you navigate the complex
            landscape of the city and discover the ideal spot for your venture
            to thrive. Our data-driven approach combines cutting-edge analytics
            with comprehensive local insights to guide you towards making an
            informed decision. Whether you're launching a trendy café in
            Brooklyn, a tech startup in Manhattan, or a manufacturing facility
            in Buffalo, we're here to simplify your location selection process.
            Our questionnaire is designed to understand your unique business
            needs, target demographics, and growth aspirations. By analyzing
            factors such as foot traffic, local economic trends, and
            industry-specific data, we'll provide you with tailored
            recommendations to set your business up for success. Ready to embark
            on this exciting journey? Click 'Next' to start the questionnaire
            and take the first step towards finding your ideal New York
            location!
          </p>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#DEDA6D",
              color: "#3B447A",
              borderRadius: "5px",
              padding: "0.75rem 3rem",
              boxShadow: "none",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/questions")}
          >
            Next
          </Button>
        </div>
        <div className="flex items-end justify-end w-1/3 h-full pr-20 pb-20">
          <div
            className="w-64 h-64 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, #FF7E5F, #FFD194, #FFE29A, #B8CBB8, #6BC3B1)",
            }}
          ></div>
        </div>
        {/* Progress Indicator */}
        <div className="absolute bottom-10 flex space-x-2 left-1/2 transform -translate-x-1/2">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </div>
      </motion.div>
    </>
  );
};

export default WelcomePage;
