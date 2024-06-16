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
    // absolute: Positions the image absolutely within its containing block
    // inset-0: Sets the top, right, bottom, and left properties to 0, making the image cover the entire container
    // w-full: Sets the width of the image to 100% of the container
    // h-full: Sets the height of the image to 100% of the container
    // object-cover: Ensures the image covers the container while maintaining its aspect ratio
    // opacity-80: Applies an 80% opacity effect to the image
  />
);

export default BackgroundImage;
