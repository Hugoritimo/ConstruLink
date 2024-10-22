import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";

const HelpButton: React.FC = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="absolute top-4 right-4 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700">
          <Info size={24} />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm text-gray-700">
          Aqui você pode encontrar informações sobre como preencher este
          formulário.
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default HelpButton;
