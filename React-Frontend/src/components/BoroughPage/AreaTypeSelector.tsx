import React from "react";

interface AreaTypeSelectorProps {
  areaType: string | null;
  handleSelectAreaType: (type: string) => void;
}

const AreaTypeSelector: React.FC<AreaTypeSelectorProps> = ({
  areaType,
  handleSelectAreaType,
}) => (
  <div className="mb-6 w-full max-w-md">
    <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Alegreya" }}>
      2. What type of area would you like to set up in?{" "}
      <span className="text-red-500">*</span>
    </h1>
    <div className="grid grid-cols-2 gap-4 mb-6 w-full">
      {[{ label: "Residential" }, { label: "Business oriented" }].map(
        (option) => (
          <button
            key={option.label}
            className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
              areaType === option.label
                ? "bg-primary-dark text-white"
                : "bg-transparent text-purple-900"
            }`}
            onClick={() => handleSelectAreaType(option.label)}
          >
            <span className="ml-2">{option.label}</span>
          </button>
        ),
      )}
    </div>
  </div>
);

export default AreaTypeSelector;
