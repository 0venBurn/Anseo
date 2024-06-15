import React from "react";

/**
 * ProgressIndicator component that contains the progress indicators at the bottom of the page.
 */
const ProgressIndicator: React.FC = () => {
  return (
    <div className="absolute bottom-10 flex space-x-2">
      {/* Current step indicator */}
      <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
      {/* Future step indicators */}
      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
    </div>
  );
};

export default ProgressIndicator;
