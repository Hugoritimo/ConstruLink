// MultiSelectField.tsx
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      <Select>
        <SelectTrigger className="w-full border-gray-300 focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              onClick={() => handleSelect(option.value)}
              className={
                value.includes(option.value) ? "bg-indigo-600 text-white" : ""
              }
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
