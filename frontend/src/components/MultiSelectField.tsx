// MultiSelectField.tsx
import React from "react";
import { Label } from "@/components/ui/label";

interface MultiSelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (selectedOptions: string[]) => void;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  label,
  name,
  options,
  value,
  onChange,
}) => {
  const handleSelect = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      onChange(value.filter((v) => v !== selectedValue));
    } else {
      onChange([...value, selectedValue]);
    }
  };

  return (
    <div>
      <Label className="block text-sm font-medium mb-2 text-gray-700">
        {label}
      </Label>
      <div className="mt-2">
        {value.map((selectedValue) => (
          <span
            key={selectedValue}
            className="inline-block bg-indigo-600 text-white px-2 py-1 rounded-full text-sm mr-2"
          >
            {options.find((option) => option.value === selectedValue)?.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectField;
