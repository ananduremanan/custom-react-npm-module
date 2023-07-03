import React, { ChangeEvent } from "react";
import { enableRipple } from "@syncfusion/ej2-base";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";

interface TimePickerProps {
  placeholder?: string | undefined;
  className?: string | undefined;
  minTime?: Date | undefined;
  maxTime?: Date | undefined;
  label?: string;
  id?: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

// enable ripple effect
enableRipple(true);

export const TimePicker: React.FC<TimePickerProps> = ({
  placeholder,
  className,
  minTime,
  maxTime,
  label = "",
  id,
  onChange
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <TimePickerComponent
        id="timepicker"
        placeholder={placeholder}
        min={minTime}
        max={maxTime}
        className={className}
        onChange={onChange}
      />
    </div>
  );
};