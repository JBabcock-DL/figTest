import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function NativeSelect({
  className,
  size = "default",
  ...props
}: Omit<React.ComponentProps<"select">, "size"> & { size?: "sm" | "default" }) {
  return (
    <div
      className="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          "h-9 w-full min-w-0 appearance-none rounded-[var(--radius-md)] border border-[var(--color-field)] bg-transparent px-[var(--space-md)] py-[var(--space-sm)] pr-9 text-label-md shadow-xs transition-[color,box-shadow] outline-none selection:bg-[var(--color-primary)] selection:text-[var(--color-on-primary)] placeholder:text-[var(--color-content-muted)] disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1 dark:bg-[color-mix(in_srgb,var(--color-field)_30%,transparent)] dark:hover:bg-[color-mix(in_srgb,var(--color-field)_50%,transparent)]",
          "focus-visible:border-ring focus-visible:ring-[var(--focus-ring-width)] focus-visible:ring-[color-mix(in_srgb,var(--color-focus-ring)_50%,transparent)]",
          "aria-invalid:border-[var(--color-danger)] aria-invalid:ring-[color-mix(in_srgb,var(--color-danger)_20%,transparent)] dark:aria-invalid:ring-[color-mix(in_srgb,var(--color-danger)_40%,transparent)]",
          className
        )}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[var(--color-content-muted)] opacity-50 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[var(--color-background-bright)] text-[var(--color-content)]", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[var(--color-background-bright)] text-[var(--color-content)]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
