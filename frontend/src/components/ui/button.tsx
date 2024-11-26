import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "danger" | "outline";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  isLoading = false,
  className,
  children,
  ...props
}) => {
  const variants = {
    default: "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500",
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline:
      "bg-transparent border border-gray-300 text-black hover:bg-gray-100 focus:ring-gray-400",
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition",
        variants[variant],
        isLoading ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4 mr-2"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
