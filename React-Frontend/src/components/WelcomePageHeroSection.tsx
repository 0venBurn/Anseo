import React from "react";

/**
 * HeroSection component that contains the main welcome message and description.
 */
const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center mt-32">
      {/* Main welcome message */}
      <h1
        className="text-5xl font-bold mb-4"
        style={{ fontFamily: "Alegreya", fontWeight: 700 }}
      >
        Welcome to Anseo, the place to be.
      </h1>
      {/* Description */}
      <p className="text-2xl mb-6">
        Discover your ideal business location in New York
        <br />
        with tailored solutions for your unique business needs.
      </p>
    </div>
  );
};

export default HeroSection;
