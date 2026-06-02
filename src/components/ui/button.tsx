import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-[var(--space-sm)] whitespace-nowrap rounded-none ring-offset-[var(--color-background)] transition-[color,background-color] duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "state-filled-primary",
        destructive: "state-filled-error",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-background-bright)] text-[var(--color-content)] state-surface-tertiary",
        secondary: "state-filled-secondary",
        ghost: "text-[var(--color-content)] state-surface-tertiary",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "px-[var(--space-xl)] py-[var(--space-lg)] text-body-md",
        sm: "px-[var(--space-lg)] py-[var(--space-md)] text-body-sm",
        lg: "px-[var(--space-xl)] py-[var(--space-lg)] text-body-lg-emphasis",
        icon: "aspect-square p-[var(--space-lg)] text-body-md",
      },
    },
    compoundVariants: [
      { variant: "default", class: "!text-[var(--color-on-primary)]" },
      { variant: "destructive", class: "!text-[var(--color-on-danger)]" },
      { variant: "secondary", class: "!text-[var(--color-on-secondary)]" },
    ],
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
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
