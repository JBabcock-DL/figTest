import { cn } from "@/lib/utils"

type NavMenuIconProps = {
  name: "menu" | "close"
  className?: string
}

/** Figma `56:4132` — 32×32 via object-contain (close artboard is 21.33, centered in box) */
export function NavMenuIcon({ name, className }: NavMenuIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={name === "menu" ? "/icons/nav-menu.svg" : "/icons/nav-close.svg"}
      alt=""
      width={32}
      height={32}
      className={cn("size-8 shrink-0 object-contain", className)}
      aria-hidden
    />
  )
}
