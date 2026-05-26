import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      lead: "text-xl leading-7 text-[var(--color-content-muted)] [&:not(:first-child)]:mt-6",
      large: "text-lg font-semibold",
      small: "text-label-md leading-none",
      muted: "text-label-md text-[var(--color-content-muted)]",
      default: "leading-7",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const defaultElementMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  blockquote: "blockquote",
  lead: "p",
  large: "div",
  small: "small",
  muted: "p",
  default: "p",
} as const

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

function Typography({
  className,
  variant = "default",
  as,
  ...props
}: TypographyProps) {
  const Component =
    as ?? defaultElementMap[variant ?? "default"] ?? ("p" as React.ElementType)

  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
