// Import neccesary functions and components
import React from "react";

/**
 * BackgroundImage Component
 *
 * This component renders the background image for the landing page.
 * It uses a fixed position with full coverage and an opacity effect.
 *
 * Returns a Background Image component
 */

const BackgroundImage: React.FC = () => (
  <img
    src="/img/landing.png"
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover opacity-80"
  />
);

export default BackgroundImage;
