import React, { ChangeEvent } from "react";

type TextInputProps = {
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  placeholder?: string;
  value?: any;
  label?: string;
  id?: any;
};

export const Textbox: React.FC<TextInputProps> = ({
  type = "text",
  disabled = false,
  required = false,
  className = "",
  name = "",
  placeholder = "",
  value = "",
  onChange,
  label = "",
  id,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label> :
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={className}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};
