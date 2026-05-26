import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-[var(--color-background-variant)] text-[var(--color-content-muted)] pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-[var(--space-xs)] rounded-[var(--radius-sm)] px-1 font-sans text-label-sm",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-[var(--color-background-bright)]/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-[var(--color-background-bright)]/10",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-[var(--space-xs)]", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
