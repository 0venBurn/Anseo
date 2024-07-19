import React, { useState, ChangeEvent } from "react";

interface InputBarProps {
  placeholder?: string;
  onSubmit: (value: string) => void;
}

const InputBar: React.FC<InputBarProps> = ({ onSubmit }) => {
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
      <div className="flex items-center mt-5">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={"Chat with Anseo"}
          className="flex-1 p-2 bg-bk-grey border border-bk-grey text-primary-text-dark rounded mr-1"
        />
        <button
          type="submit"
          className="bg-yellow border border-yellow text-primary-dark rounded-full ml-2 px-6 py-2"
        >
          →
        </button>
      </div>
    </form>
  );
};

export default InputBar;
