// @/components/ui/button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "ghost";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  let variantClasses = "";

  switch (variant) {
    case "primary":
      variantClasses = "bg-blue-500 hover:bg-blue-600 text-white";
      break;
    case "secondary":
      variantClasses = "bg-gray-500 hover:bg-gray-600 text-white";
      break;
    case "outline":
      variantClasses = "border border-gray-300 hover:bg-gray-100";
      break;
    case "danger":
      variantClasses = "bg-red-500 hover:bg-red-600 text-white";
      break;
    case "ghost":
      variantClasses = "bg-transparent hover:bg-gray-200 text-[#af1b1b]"; // Defina as classes para "ghost"
      break;
    default:
      variantClasses = "bg-blue-500 hover:bg-blue-600 text-white";
  }

  return (
    <button
      className={`px-4 py-2 rounded-md ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
