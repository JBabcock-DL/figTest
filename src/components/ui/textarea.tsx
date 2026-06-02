import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex min-h-[var(--field-textarea-min-height)] w-full rounded-none border bg-[var(--color-background-bright)] p-[var(--space-xl)] text-[var(--color-content)] ring-offset-[var(--color-background)] placeholder:text-[var(--color-content-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-[var(--color-field)]",
        invalid: "border-[var(--color-danger)]",
      },
      size: {
        sm: "text-body-sm",
        default: "text-body-md",
        lg: "text-body-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  }
)

export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
