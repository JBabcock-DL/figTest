"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-[var(--radius-md)] text-label-md ring-offset-[var(--color-background)] transition-colors state-surface-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[var(--color-accent-subtle)] data-[state=on]:text-[var(--color-on-accent)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-[var(--space-sm)]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-[var(--color-field)] bg-transparent",
      },
      size: {
        default: "h-10 px-[var(--space-md)] min-w-10",
        sm: "h-9 px-[var(--space-sm)] min-w-9",
        lg: "h-11 px-5 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
