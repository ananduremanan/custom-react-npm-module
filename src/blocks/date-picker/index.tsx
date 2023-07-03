import React from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

// Declare the expected props for the DatePicker component
interface DatePickerProps {
  id?: any;
  placeholder?: string;
  value?: any;
  onChange?: (event: any) => void;
  className?: string;
  label?: string;
}

// Define the DatePicker component
export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  placeholder = "",
  value = "",
  onChange,
  className = "",
  label = "",
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label> :
      <DatePickerComponent
        id="datepicker"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
    </div>
  );
};
