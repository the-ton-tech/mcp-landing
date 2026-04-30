import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold leading-6 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--button--background)] text-primary-foreground hover:bg-[var(--accent-hover)]",
        destructive:
          "bg-[var(--text-error)] text-destructive-foreground hover:bg-[var(--text-error)]",
        outline:
          "border border-[var(--button-secondary-stroke)] bg-[var(--background-page)] text-[var(--text-secondary)] hover:border-[var(--accent-default)] hover:bg-[var(--background-content-hover)] hover:text-[var(--accent-default)]",
        secondary:
          "bg-[var(--background-content)] text-[var(--text-secondary)] hover:bg-[var(--background-content-hover)]",
        ghost:
          "text-[var(--text-secondary)] hover:bg-[var(--background-content-hover)] hover:text-[var(--accent-default)]",
        link: "text-[var(--accent-default)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-sm font-semibold leading-5",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
