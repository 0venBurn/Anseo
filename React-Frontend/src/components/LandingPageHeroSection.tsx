import React from "react";

/**
 * HeroSection Component
 *
 * This component renders the HeroSection component.
 * It renders in the welcoming and promotional message for viewers on the landing page
 *
 *
 * Returns the HeroSection component
 */

const HeroSection: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col items-center text-center mt-20">
      <h1
        className="text-5xl font-bold mb-4"
        style={{ fontFamily: "Alegreya" }}
      >
        The place to be.
      </h1>
      <p className="text-2xl mb-6">
        Discover your ideal business location in New York
        <br />
        with tailored solutions for your unique business needs.
      </p>
    </div>
  );
};

export default HeroSection;
