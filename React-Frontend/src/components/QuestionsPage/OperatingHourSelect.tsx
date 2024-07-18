import React from "react";
import { Select, MenuItem } from "@mui/material";
import QuestionLabel from "../Questionnaire/QuestionLabel";

interface OperatingHoursSelectorProps {
  openHour: number;
  closeHour: number;
  setOpenHour: (hour: number) => void;
  setCloseHour: (hour: number) => void;
}

const OperatingHoursSelector: React.FC<OperatingHoursSelectorProps> = ({
  openHour,
  closeHour,
  setOpenHour,
  setCloseHour,
}) => (
  <div className="mb-10 w-full max-w-md">
    <QuestionLabel label="Operating hours:" />
    <div className="grid grid-cols-2 gap-4 md:text-xl">
      <div>
        <label className="block mb-2">Opening Time</label>
        <Select
          value={openHour}
          onChange={(e) => setOpenHour(parseInt(String(e.target.value)))}
          className="w-full rounded-lg py-2 px-4 text-xl text-inter font-bold  bg-transparent  "
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
