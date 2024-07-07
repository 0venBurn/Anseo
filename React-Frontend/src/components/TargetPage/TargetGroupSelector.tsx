import React from "react";

interface TargetGroupSelectorProps {
  targetGroup: string | null;
  setTargetGroup: (group: string) => void;
}

const TargetGroupSelector: React.FC<TargetGroupSelectorProps> = ({
  targetGroup,
  setTargetGroup,
}) => (
  <div className="mb-10">
    <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Alegreya" }}>
      3. Is your business targeting families or singles?{" "}
      <span className="text-red-500">*</span>
    </h1>
    <div className="grid grid-cols-2 gap-4">
      {["Families", "Singles"].map((option) => (
        <button
          key={option}
          className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
            targetGroup === option
              ? "bg-primary-dark text-white"
              : "bg-transparent text-purple-900"
          }`}
          onClick={() => setTargetGroup(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default TargetGroupSelector;
