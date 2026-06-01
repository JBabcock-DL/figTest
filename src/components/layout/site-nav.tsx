"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { BedrockLogo } from "@/components/layout/bedrock-logo"
import { MOBILE_TOP_BAR_HEIGHT } from "@/components/layout/mobile-top-bar"
import { MobileNavMenu } from "@/components/layout/mobile-nav-menu"
import { NavMenuIcon } from "@/components/layout/nav-menu-icons"
import { NAV_LINKS } from "@/components/layout/nav-links"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import { cn } from "@/lib/utils"

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className="group flex flex-col items-center gap-[var(--space-xs)] pt-[var(--space-lg)] outline-none"
    >
      <span
        className={cn(
          "text-body-lg whitespace-nowrap",
          isActive ? "text-[var(--color-primary)]" : "text-[var(--color-content)]"
        )}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "h-[var(--border-nav-active)] w-full bg-[var(--color-primary)] transition-opacity",
          isActive
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        )}
      />
    </Link>
  )
}

export function SiteNav() {
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const breakpoint = useBreakpoint()
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setVisible(current < lastScrollY.current || current < 10)
      lastScrollY.current = current
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (breakpoint === "desktop") setMenuOpen(false)
  }, [breakpoint])

  return (
    <>
      <nav
        className={cn(
          "fixed left-0 top-0 z-[1100] flex w-full items-start justify-center bg-[var(--color-background-bright)] px-[var(--space-4xl)] py-[var(--space-xl)] max-lg:items-center max-lg:px-[var(--space-md)] max-lg:py-0",
          MOBILE_TOP_BAR_HEIGHT,
          menuOpen && breakpoint !== "desktop" && "max-lg:invisible max-lg:pointer-events-none"
        )}
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 500ms ease-in-out",
        }}
      >
        <div className="flex h-full w-full max-w-[var(--layout-nav-max)] items-center justify-between max-lg:h-[var(--layout-nav-height-mobile)]">
          <Link
            href="/"
            className="flex h-[var(--layout-logo-height-full)] items-center max-lg:h-[var(--layout-logo-height-minimal)]"
            aria-label="Bedrock — home"
          >
            <BedrockLogo variant="full" className="max-lg:hidden" priority />
            <BedrockLogo variant="minimal" className="hidden max-lg:block" priority />
          </Link>

          <div className="hidden items-start gap-[var(--space-3xl)] lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>

          <button
            type="button"
            className="flex size-8 items-center justify-center text-[var(--color-content)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <NavMenuIcon name="menu" />
          </button>
        </div>
      </nav>

      <MobileNavMenu open={menuOpen} onOpenChange={setMenuOpen} breakpoint={breakpoint} />
    </>
  )
}
