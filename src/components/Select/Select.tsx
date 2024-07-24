import React from "react";
import { SelectProps } from "./index";

const Select: React.FC<SelectProps> = ({ options, className, ariaLabel, ...props }) => {
  return (
    <select className={className} aria-label={ariaLabel} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled || option.hidden}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
