import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[var(--space-sm)] whitespace-nowrap rounded-[var(--radius-md)] text-label-md ring-offset-[var(--color-background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] text-[var(--color-on-primary)] state-filled-primary",
        destructive:
          "bg-[var(--color-danger)] text-[var(--color-on-danger)] state-filled-error",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-background-bright)] text-[var(--color-content)] state-surface-tertiary",
        secondary:
          "bg-[var(--color-secondary)] text-[var(--color-on-secondary)] state-filled-secondary",
        ghost:
          "text-[var(--color-content)] state-surface-tertiary",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-[var(--space-xl)] py-[var(--space-md)]",
        sm: "h-10 rounded-[var(--radius-md)] px-[var(--space-lg)] py-[var(--space-sm)]",
        lg: "h-14 rounded-[var(--radius-md)] px-[var(--space-2xl)] py-[var(--space-lg)]",
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
