import React from "react";
import { Label } from "@/components/ui/label";

interface TextareaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean; // Tornando 'required' opcional
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false, // Definindo valor padrão para 'required'
}) => (
  <div className="mb-4">
    <Label
      htmlFor={name}
      className="block text-sm font-medium mb-2 text-gray-700"
    >
      {label}
    </Label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required} // Passando a propriedade 'required'
      className="w-full p-2 border border-gray-300 rounded"
    />
  </div>
);

export default TextareaField;
