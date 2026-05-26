import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-[var(--space-sm)] py-[var(--space-xs)] text-label-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-primary)] text-[var(--color-on-primary)] state-filled-primary",
        secondary:
          "border-transparent bg-[var(--color-secondary)] text-[var(--color-on-secondary)] state-filled-secondary",
        destructive:
          "border-transparent bg-[var(--color-danger)] text-[var(--color-on-danger)] state-filled-error",
        outline: "text-[var(--color-content)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
