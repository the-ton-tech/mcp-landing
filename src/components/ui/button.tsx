import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "ton-button",
  {
    variants: {
      variant: {
        default: "ton-button-primary",
        destructive: "ton-button-destructive",
        outline: "ton-button-inversed",
        secondary: "ton-button-secondary",
        ghost: "ton-button-ghost",
        link: "ton-button-link",
      },
      size: {
        default: "ton-button-default",
        sm: "ton-button-sm",
        lg: "ton-button-default",
        icon: "ton-button-icon",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
