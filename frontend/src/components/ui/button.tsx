// components/ui/button.tsx

import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils" // Ajuste o path se você tiver outro helper

// 1) Definindo as classes com cva:
const buttonVariants = cva(
  // Classes base
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        // 2) Aqui definimos o variant "default"
        default: "bg-slate-900 text-white hover:bg-slate-700 focus:ring-slate-400 focus:ring-offset-slate-900",
        
        // 3) Mudei as cores do variant "destructive" para outro tom de vermelho
        destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 focus:ring-offset-red-50",

        // 4) Outros variants de exemplo
        outline: "border border-slate-200 hover:bg-slate-100",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "hover:bg-slate-100",
        link: "underline-offset-4 hover:underline text-slate-900 hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// 5) Interface para as props do Button
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// 6) Componente Button
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        // 7) Aqui aplicamos as classes do cva + className que vier de fora
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
