import { enableRipple } from "@syncfusion/ej2-base";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import * as React from "react";

enableRipple(true);

interface CheckboxProps {
  className?: string;
  id?: any;
  label?: string;
}

export const CheckBox: React.FC<CheckboxProps> = ({ className, id, label }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label> :
      <CheckBoxComponent className={className} id={id} />
    </div>
  );
};
