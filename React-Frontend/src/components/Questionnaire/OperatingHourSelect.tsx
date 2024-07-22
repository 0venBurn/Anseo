import React from "react";
import { Select, MenuItem } from "@mui/material";
import QuestionLabel from "./QuestionLabel";

interface OperatingHoursSelectorProps {
  openHour: number;
  closeHour: number;
  setOpenHour: (hour: number) => void;
  setCloseHour: (hour: number) => void;
  questionNumber: number;
}

const OperatingHoursSelector: React.FC<OperatingHoursSelectorProps> = ({
  openHour,
  closeHour,
  setOpenHour,
  setCloseHour,
  questionNumber
}) => (
  <div className="mb-6 flex flex-col items-center lg:w-[90%]">
    <QuestionLabel label="What are your business's operating hours?" questionNumber={questionNumber} />
    <div className="grid md:place-items-center grid-cols-2 sm:grid-cols-2 gap-4 md:text-xl max-w-[75%]">
      <div>
        <label className="block mb-2">Opening Time</label>
        <Select
          value={openHour}
          onChange={(e) => setOpenHour(parseInt(String(e.target.value)))}
          className="w-full rounded-lg py-2 px-4 text-xl text-inter font-bold bg-transparent  "
        >
          {[...Array(24).keys()].map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour}:00
            </MenuItem>
          ))}
        </Select>
      </div>
      <div>
        <label className="block mb-2">Closing Time</label>
        <Select
          value={closeHour}
          onChange={(e) => setCloseHour(parseInt(String(e.target.value)))}
          className="w-full rounded-lg py-2 px-4 text-xl font-bold bg-transparent  "
        >
          {[...Array(24).keys()].map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour}:00
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  </div>
);

export default OperatingHoursSelector;
