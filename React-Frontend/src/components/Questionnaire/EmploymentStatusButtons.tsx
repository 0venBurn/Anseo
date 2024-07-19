import QuestionLabel from "./QuestionLabel";

interface EmploymentStatusButtonsProps {
  value: string[];
  setValue: (value: string[]) => void;
  questionNumber: number;
}

const EmploymentStatusButtons: React.FC<EmploymentStatusButtonsProps> = ({
  value,
  setValue,
  questionNumber
}) => {
  const options = ["Full Time", "Part Time", "No Preference"];

  const handleSelection = (option: string) => {
    if (option === "No Preference") {
      setValue([option]);
    } else {
      let newValue = [...value];
      if (newValue.includes(option)) {
        newValue = newValue.filter((item) => item !== option);
      } else {
        newValue = newValue.filter((item) => item !== "No Preference");
        newValue.push(option);
      }
      setValue(newValue);
    }
  };

  return (
    <div className="mb-6">
      <QuestionLabel label="What type of employment status are you looking to offer?" questionNumber={questionNumber} />
      <div className="grid place-items-center grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full">
        {options.map((option) => (
          <button
            key={option}
            className={`w-[50%] md:w-[100%] py-4 px-8 rounded-lg md:text-xl font-bold flex items-center justify-center border-2 ${
              value.includes(option)
                ? "bg-primary-dark text-white"
                : "bg-primary-light text-primary-text-dark"
            }`}
            onClick={() => handleSelection(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmploymentStatusButtons;
