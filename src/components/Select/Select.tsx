import React from "react";
// import { IOptionSelect } from "~/types";

export interface IOptionSelect {
  value: string;
  label: string;
  disabled?: boolean;
  hidden?: boolean;
}

interface SelectProps {
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: IOptionSelect[];
  label: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({ options, className, ...props }) => {
  return (
    <select className={className} {...props}>
      {options.map((option) => (
        <option className={`${option.hidden ? "hidden" : ""}`} key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
