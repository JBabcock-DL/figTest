"use client"

import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheck className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <TriangleAlert className="h-4 w-4" />,
        error: <OctagonX className="h-4 w-4" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--color-background-bright)] group-[.toaster]:text-[var(--color-content)] group-[.toaster]:border-[var(--color-border)] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[var(--color-content-muted)]",
          actionButton:
            "group-[.toast]:bg-[var(--color-primary)] group-[.toast]:text-[var(--color-on-primary)]",
          cancelButton:
            "group-[.toast]:bg-[var(--color-background-variant)] group-[.toast]:text-[var(--color-content-muted)]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
