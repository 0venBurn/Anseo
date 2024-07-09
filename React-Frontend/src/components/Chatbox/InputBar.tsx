import React, { useState, ChangeEvent } from "react";

interface InputBarProps {
  placeholder?: string;
  onSubmit: (value: string) => void;
}

const InputBar: React.FC<InputBarProps> = ({
  placeholder = "Enter text...",
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-1 w-full p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default InputBar;
