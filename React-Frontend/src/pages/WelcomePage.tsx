// WelcomePage.tsx
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import "../index.css";
import LinearGradientCircle from "../components/LinearGradientCircle";
import NavigationButtons from "../components/Questionnaire/NavigationButtons";

// Setting steps for progress indicator button
const currentStep = 1;
const totalSteps = 5;

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
        className="relative min-h-screen flex flex-col items-center lg:items-start justify-between text-primary-text-dark bg-bk-grey"
      >
        {/* Text on main page */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left mt-28 lg:mt-32 mb-8 max-w-[75%] xl:max-w-[80%] lg:px-20">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold font-alegreya mb-4">
            Welcome to Anseo, the place to be.
          </h1>
          <p className="text-2xl lg:text-3xl font-commissioner mb-6">
            Discover your ideal business location in New York
            with tailored solutions for your unique business needs.
          </p>
          <p className="text-lg mb-6">
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
                backgroundColor: '#DEDA6D',
                color: '#3B447A',
                fontWeight: 'medium',
                borderRadius: '5px',
                padding: "0.5rem 4rem",
                // boxShadow: "none",
                fontFamily: 'Inter',
                textTransform: 'none', 
                '&:hover': {
                  backgroundColor: '#3B447A',
                  color: 'white',
                } 
              }}
              onClick={() => navigate("/business-details")}
            >
              Next
            </Button>
        </div>
        {/* Progress Indicator */}
        <div className="flex items-center justify-center w-full">
        <NavigationButtons
        currentStep={currentStep}
        totalSteps={totalSteps}
        />
        </div>
        <LinearGradientCircle />
      </motion.div>
    </>
  );
};

export default WelcomePage;
