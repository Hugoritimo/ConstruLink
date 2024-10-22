// components/SelectField.tsx
import React from "react";
import { Label } from "@/components/ui/label";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  required = false,
}) => {
  return (
    <div className="flex flex-col">
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-2 p-2 border border-gray-300 rounded"
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
