import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-[var(--radius-md)] border bg-[var(--color-background-bright)] px-[var(--space-md)] ring-offset-[var(--color-background)] file:border-0 file:bg-transparent file:text-label-md file:text-[var(--color-content)] placeholder:text-[var(--color-content-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-[var(--color-field)] text-[var(--color-content)]",
        invalid: "border-[var(--color-danger)] text-[var(--color-content)]",
        disabled: "border-[var(--color-field)] text-[var(--color-content-muted)] opacity-50 cursor-not-allowed",
      },
      size: {
        sm: "h-8 py-[var(--space-xs)] text-body-sm",
        default: "h-10 py-[var(--space-sm)] text-body-md",
        lg: "h-12 py-[var(--space-md)] text-body-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
