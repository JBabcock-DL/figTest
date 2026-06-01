"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Our Story", href: "/our-story" },
  { label: "Our Properties", href: "/properties" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
]

const ACCOUNT_LINKS = [
  { label: "Sign in", href: "/sign-in" },
  { label: "Create account", href: "/signup" },
]

function NavLink({
  href,
  label,
  emphasis = false,
}: {
  href: string
  label: string
  emphasis?: boolean
}) {
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
          emphasis
            ? "text-[var(--color-primary)]"
            : "text-[var(--color-content)]"
        )}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "h-[2px] w-full bg-[var(--color-primary)] transition-opacity",
          isActive
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        )}
      />
    </Link>
  )
}

export function SiteNav() {
  return (
    <nav className="absolute left-0 top-0 z-50 flex w-full items-start justify-center bg-[var(--color-background-bright)] px-[var(--space-4xl)] py-[var(--space-xl)]">
      <div className="flex w-full max-w-[1600px] items-start justify-between">
        <Link href="/" className="flex h-[60px] items-center" aria-label="Bedrock — home">
          <Image
            src="/bedrock-logo.svg"
            alt="Bedrock"
            width={171}
            height={60}
            className="h-[60px] w-auto"
            priority
          />
        </Link>

        <div className="flex items-start gap-[var(--space-3xl)]">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <span aria-hidden="true" className="mt-[var(--space-lg)] h-6 w-px bg-[var(--color-border)]" />
          {ACCOUNT_LINKS.map((link, i) => (
            <NavLink key={link.href} {...link} emphasis={i === 1} />
          ))}
        </div>
      </div>
    </nav>
  )
}
