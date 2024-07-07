import React from "react";

interface BoroughSelectorProps {
  selectedBoroughs: string[];
  handleSelectBorough: (borough: string) => void;
}

const BoroughSelector: React.FC<BoroughSelectorProps> = ({
  selectedBoroughs,
  handleSelectBorough,
}) => (
  <div className="mb-6 w-full max-w-md">
    <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Alegreya" }}>
      1. Which boroughs are you most interested in for your business location?{" "}
      <span className="text-red-500">*</span>
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full">
      {[
        { label: "Manhattan" },
        { label: "Brooklyn" },
        { label: "Queens" },
        { label: "Bronx" },
        { label: "Staten Island" },
        { label: "No preference" },
      ].map((option) => (
        <button
          key={option.label}
          className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
            selectedBoroughs.includes(option.label)
              ? "bg-primary-dark text-white"
              : "bg-transparent text-purple-900"
          }`}
          onClick={() => handleSelectBorough(option.label)}
        >
          <span className="ml-2">{option.label}</span>
        </button>
      ))}
    </div>
  </div>
);

export default BoroughSelector;
