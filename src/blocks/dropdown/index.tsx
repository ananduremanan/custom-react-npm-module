import React from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

interface CustomDropdownProps {
  dataSource?: any[];
  fields?: { text: any; value: any };
  placeholder?: string;
  value?: string;
  onChange?: (event: any) => void;
  className?: string;
  label?: string;
  id?: any;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  dataSource,
  fields,
  placeholder = "",
  value,
  onChange,
  className = "",
  label,
  id,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label> :
      <DropDownListComponent
        id="ddlelement"
        dataSource={dataSource}
        fields={fields}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
    </div>
  );
};
