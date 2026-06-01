import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AnimateIn } from "@/components/layout/animate-in"

const QUIET_HOVER =
  "p-[var(--space-xs)] transition-colors duration-200 ease-in-out hover:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]"

type IconProps = { className?: string }

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const SOCIAL = [
  { label: "Instagram", Icon: InstagramIcon, href: "#" },
  { label: "Facebook", Icon: FacebookIcon, href: "#" },
  { label: "X", Icon: XIcon, href: "#" },
  { label: "LinkedIn", Icon: LinkedInIcon, href: "#" },
]

const COLUMNS: { title: string; href: string; links: string[] }[] = [
  { title: "Our Story", href: "/our-story", links: ["Our Values", "Our People"] },
  {
    title: "Our Properties",
    href: "/properties",
    links: ["Office", "Retail", "Residential", "Hospitality", "Parking", "Data Center", "Industrial"],
  },
  { title: "News", href: "/news", links: ["Press Releases", "Media Inquiries"] },
  { title: "Tenants", href: "/tenants", links: ["Make a Payment", "Maintenance Request", "Visitor Registration"] },
]

export function SiteFooter() {
  return (
    <footer className="flex w-full items-center justify-center bg-[var(--color-inverse-surface)] px-[var(--space-4xl)] py-[var(--space-4xl)] max-lg:px-[var(--space-md)] max-lg:py-[var(--space-4xl)] text-[var(--color-inverse-content)]">
      <div className="flex w-full max-w-[1560px] flex-col gap-[var(--space-4xl)] py-[var(--space-xl)] lg:flex-row lg:flex-wrap lg:items-start lg:justify-between lg:gap-y-[64px]">
        <div className="flex w-full min-w-0 flex-col gap-[var(--space-4xl)] lg:min-w-[500px] lg:flex-1 lg:w-auto">
          <AnimateIn delay={100}>
            <div className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="text-display-md text-[var(--color-background-bright)]">Connect with us.</h2>
              <Link
                href="#contact-form"
                className={
                  "flex w-fit items-center gap-[var(--space-xs)] rounded-[var(--space-xs)] text-body-lg font-bold! text-[var(--color-inverse-content)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] " +
                  QUIET_HOVER
                }
              >
                Let&apos;s Talk
                <ArrowRight className="size-6" aria-hidden="true" />
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn delay={200}>
            <ul className="flex items-center gap-[21px]">
              {SOCIAL.map(({ label, Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="flex size-8 items-center justify-center text-[var(--color-inverse-content)] outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                  >
                    <Icon className="size-8" />
                  </a>
                </li>
              ))}
            </ul>
          </AnimateIn>

          <AnimateIn delay={300}>
            <div className="flex items-center gap-[var(--space-lg)] text-body-lg">
              <Link href="/sign-in" className="underline-offset-4 hover:underline">
                Sign in
              </Link>
              <span aria-hidden="true" className="text-[var(--color-primary-fixed-dim)]">
                |
              </span>
              <Link href="/signup" className="underline-offset-4 hover:underline">
                Create account
              </Link>
            </div>
          </AnimateIn>
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-[var(--space-3xl)] sm:grid-cols-2 lg:flex lg:w-[800px] lg:min-w-[800px] lg:shrink-0 lg:flex-wrap lg:items-start lg:gap-[var(--space-3xl)]">
          {COLUMNS.map((col, i) => (
            <AnimateIn
              key={col.title}
              delay={200 + i * 100}
              className="flex min-w-0 w-full flex-col gap-[var(--space-md)] lg:min-w-px lg:flex-1"
            >
              <Link
                href={col.href}
                className="w-full border-b border-[var(--color-primary-fixed-dim)] pb-[var(--space-sm)] text-body-lg font-bold! text-[var(--color-inverse-content)]"
              >
                {col.title}
              </Link>
              <ul className="flex flex-col gap-[var(--space-xl)]">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-body-lg text-[var(--color-inverse-content)] underline-offset-4 hover:underline"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn
          delay={200 + COLUMNS.length * 100}
          className="flex w-full min-w-0 flex-col gap-[var(--space-lg)] text-body-lg text-[var(--color-background-bright)] lg:min-w-[500px] lg:flex-1 lg:w-auto"
        >
          <address className="not-italic">
            630 Woodward Avenue, Detroit, MI 48226
            <br />
            250 West Huron Road, Cleveland, OH 44113
            <br />
            <a href="tel:313-373-8700" className="underline [text-underline-position:from-font]">
              313.373.8700
            </a>
          </address>
          <p className="flex flex-wrap items-center gap-x-[var(--space-xs)]">
            <span>© 2024 Bedrock Management Services LLC</span>
            <span aria-hidden="true">|</span>
            <a
              href="https://www.bedrockdetroit.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline [text-underline-position:from-font]"
            >
              Privacy Policy
            </a>
            <span aria-hidden="true">|</span>
            <a
              href="https://www.bedrockdetroit.com/equal-housing-statement/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline [text-underline-position:from-font]"
            >
              EHOS
            </a>
            <span aria-hidden="true">|</span>
            <a
              href="https://bedrockdetroit.com/dmca/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline [text-underline-position:from-font]"
            >
              DMCA
            </a>
          </p>
        </AnimateIn>
      </div>
    </footer>
  )
}
