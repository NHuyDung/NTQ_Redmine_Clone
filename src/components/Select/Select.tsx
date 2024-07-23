import React from "react";

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
  label?: string;
  className?: string;
  ariaLabel?: string;
}

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
