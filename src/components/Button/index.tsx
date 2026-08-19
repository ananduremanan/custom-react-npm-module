import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button = ({ label, ...rest }: ButtonProps) => {
  return <button {...rest}>{label}</button>;
};
