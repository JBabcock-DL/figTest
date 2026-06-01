"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { BedrockLogo } from "@/components/layout/bedrock-logo"
import { MOBILE_TOP_BAR } from "@/components/layout/mobile-top-bar"
import { NavMenuIcon } from "@/components/layout/nav-menu-icons"
import { NAV_LINKS } from "@/components/layout/nav-links"
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import type { Breakpoint } from "@/hooks/use-breakpoint"

type MobileNavMenuProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  breakpoint: Breakpoint
}

function MenuNavLink({ href, label, onNavigate }: { href: string; label: string; onNavigate: () => void }) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
        isActive ? "text-[var(--color-primary)]" : "text-[var(--color-content)]"
      )}
    >
      {label}
    </Link>
  )
}

export function MobileNavMenu({ open, onOpenChange, breakpoint }: MobileNavMenuProps) {
  const isMobile = breakpoint === "mobile"
  const close = () => onOpenChange(false)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        id="mobile-nav-menu"
        hideDefaultClose
        overlayClassName="z-[1200] bg-black/40"
        className={cn(
          "z-[1200] flex flex-col gap-0 bg-[var(--color-background-bright)] p-0",
          isMobile
            ? "inset-0 h-full w-full max-w-none border-0 sm:max-w-none"
            : "w-[min(100vw,360px)] max-w-[360px] gap-[var(--space-2xl)] p-[var(--space-4xl)]"
        )}
      >
        <SheetTitle className="sr-only">Site navigation</SheetTitle>

        <div className={MOBILE_TOP_BAR}>
          <Link href="/" onClick={close} className="flex h-[40px] items-center" aria-label="Bedrock — home">
            <BedrockLogo variant={isMobile ? "minimal" : "full"} />
          </Link>
          <button
            type="button"
            onClick={close}
            className="flex size-8 shrink-0 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            aria-label="Close menu"
          >
            <NavMenuIcon name="close" />
          </button>
        </div>

        <nav
          className={cn(
            "flex flex-col px-[var(--space-md)] pb-[var(--space-xl)]",
            isMobile ? "flex-1 gap-[var(--space-3xl)] pt-[var(--space-xl)]" : "gap-[var(--space-2xl)]"
          )}
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <MenuNavLink key={link.href} {...link} onNavigate={close} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
