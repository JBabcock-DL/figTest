import Image from "next/image"
import Link from "next/link"

import { AnimateIn } from "@/components/layout/animate-in"
import { CarouselReveal } from "@/components/layout/carousel-reveal"
import { NeighborhoodMapWrapper } from "@/components/layout/neighborhood-map-wrapper"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel } from "@/components/ui/field"
import { PropertyCarousel } from "@/components/ui/property-carousel"
import type { Property } from "@/data/properties"

const FORM_FIELDS = [
  { id: "first-name", label: "First Name", half: true, placeholder: "Jane" },
  { id: "last-name", label: "Last Name", half: true, placeholder: "Doe" },
  { id: "email", label: "Email", half: true, placeholder: "you@example.com" },
  { id: "phone", label: "Phone", half: true, placeholder: "(555) 555-5555" },
  { id: "company-name", label: "Company Name", half: false, placeholder: "Company name" },
  { id: "message", label: "Message", half: false, multiline: true, placeholder: "How can we help?" },
] as const

const SECTION_PX = "px-[var(--space-4xl)] max-lg:px-[var(--space-md)]"
/** Mobile vertical rhythm: 4xl padding unless the section ends on full-bleed media. */
const MOBILE_PY = "max-lg:py-[var(--space-4xl)]"
const MOBILE_PB_FLUSH = "max-lg:pb-0"

/** Counteract section horizontal padding so media spans the mobile viewport (Figma `56:2962`). */
const MOBILE_FULL_BLEED =
  "max-lg:relative max-lg:left-1/2 max-lg:w-screen max-lg:max-w-none max-lg:-translate-x-1/2"

const QUIET_HOVER =
  "p-[var(--space-xs)] transition-colors duration-200 ease-in-out hover:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]"

/** Quiet (text + icon) action — the design's "button size/quiet". */
function QuietAction({
  href,
  children,
  external = false,
  light = false,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  light?: boolean
}) {
  const className =
    "flex w-fit items-center gap-[var(--space-xs)] rounded-[var(--space-xs)] text-body-lg font-bold! outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] " +
    QUIET_HOVER +
    " " +
    (light ? "text-[var(--color-inverse-content)]" : "text-[var(--color-content)]")
  const inner = (
    <>
      {children}
      <ArrowRight className="size-6" aria-hidden="true" />
    </>
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  )
}

export function PropertyDetail({ property }: { property: Property }) {
  const websiteLabel = property.websiteUrl.replace(/^https?:\/\//, "")

  return (
    <div className="w-full min-w-0 overflow-x-clip bg-[var(--color-background-bright)] text-[var(--color-content)]">
      {/* 1. Hero */}
      <section
        className={`flex w-full flex-col items-center ${SECTION_PX} pt-[var(--layout-nav-offset-top)] max-lg:pt-[calc(var(--layout-nav-height-mobile)+var(--space-4xl))] ${MOBILE_PB_FLUSH}`}
      >
        <div className="flex w-full max-w-[var(--layout-content-max)] flex-col flex-wrap items-stretch gap-[var(--space-4xl)] max-lg:gap-[var(--space-xl)] lg:flex-row lg:items-start">
          <AnimateIn className="flex min-w-0 flex-1 flex-col gap-[var(--space-2xl)] lg:min-w-[var(--layout-column-min)] lg:pb-[var(--space-3xl)] lg:pr-[var(--space-4xl)]">
            <Link
              href="/properties"
              className={
                "flex w-fit items-center gap-[var(--space-xs)] rounded-[var(--space-xs)] text-body-lg font-bold! text-[var(--color-content)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] " +
                QUIET_HOVER
              }
            >
              <ArrowLeft className="size-6" aria-hidden="true" />
              Back
            </Link>

            <div className="flex flex-col gap-[var(--space-sm)]">
              <h1 className="text-display-lg text-[var(--color-content)]">{property.name}</h1>
              <p className="text-title-lg text-[var(--color-content-muted)]">{property.address}</p>
            </div>

            <p className="text-body-lg text-[var(--color-content)]">{property.description}</p>

            <div className="flex flex-col gap-[var(--space-sm)] text-[var(--color-content)]">
              <p className="text-body-lg font-bold!">Property Information</p>
              <ul className="list-disc text-body-lg">
                {property.highlights.map((highlight) => (
                  <li key={highlight} className="ms-6">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={property.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-body-lg text-[var(--color-primary)] underline [text-underline-position:from-font]"
            >
              {websiteLabel}
            </a>
          </AnimateIn>

          <AnimateIn
            variant="scale"
            className={`relative min-w-0 w-full max-w-[var(--layout-hero-image-max)] flex-1 aspect-square overflow-hidden lg:max-w-[var(--layout-hero-image-max)] ${MOBILE_FULL_BLEED}`}
          >
            <Image
              src={property.heroImage}
              alt={property.name}
              fill
              className="object-cover"
              sizes="(max-width: 63.9375rem) 100vw, 46.875rem"
              priority
            />
          </AnimateIn>
        </div>
      </section>

      {/* 2. Property Details — dark */}
      <section
        className={`flex w-full items-center justify-center bg-[var(--color-inverse-surface)] p-[var(--space-4xl)] max-lg:px-[var(--space-md)] ${MOBILE_PY} text-[var(--color-inverse-content)]`}
      >
        <div className="flex w-full max-w-[var(--layout-content-max)] flex-col items-start gap-y-[var(--space-4xl)] py-[var(--space-xl)] lg:flex-row lg:flex-wrap lg:items-start lg:justify-between lg:gap-y-[var(--layout-section-gap-lg)]">
          <div className="flex w-full min-w-0 max-w-[var(--layout-details-col-max)] flex-col gap-[var(--space-2xl)] lg:flex-1 lg:min-w-[var(--layout-column-min)]">
            <AnimateIn delay={100}>
              <h2 className="text-display-md text-[var(--color-inverse-content)]">Property Details</h2>
            </AnimateIn>
            <AnimateIn delay={200}>
              <QuietAction href="#contact-form" light>
                Contact for more info
              </QuietAction>
            </AnimateIn>
          </div>

          <dl className="flex w-full min-w-0 flex-1 flex-col gap-[var(--space-4xl)] sm:flex-row sm:flex-wrap">
            {property.details.map((field, i) => (
              <AnimateIn
                key={field.label}
                delay={200 + i * 100}
                className="flex min-w-[var(--layout-details-field-min)] max-w-[var(--layout-details-field-max)] flex-1 flex-col gap-[var(--space-sm)]"
              >
                <dt className="text-title-lg font-bold! text-[var(--color-inverse-content)]">
                  {field.label}
                </dt>
                <dd className="text-body-lg text-[var(--color-inverse-content)]">{field.value}</dd>
              </AnimateIn>
            ))}
          </dl>
        </div>
      </section>

      {/* 3. Image carousel — full-bleed with overlay reveal */}
      <section className="w-full min-w-0 overflow-hidden">
        <CarouselReveal>
          <PropertyCarousel images={property.images} />
        </CarouselReveal>
      </section>

      {/* 4. Map + Neighborhood */}
      <section
        className={`flex w-full flex-col items-center justify-center ${SECTION_PX} py-[var(--layout-nav-offset-top)] max-lg:pt-[var(--space-4xl)] ${MOBILE_PB_FLUSH}`}
      >
        <div className="flex w-full max-w-[var(--layout-content-max)] flex-col items-stretch gap-[var(--space-4xl)] bg-[var(--color-background-bright)] max-lg:gap-[var(--space-4xl)] lg:flex-row lg:items-center">
          <AnimateIn
            from="below"
            delay={0}
            className="flex min-w-0 flex-1 flex-col gap-[var(--space-3xl)] p-[var(--space-4xl)] max-lg:p-0 lg:order-2 lg:min-w-[var(--layout-column-min)]"
          >
            <div className="flex flex-col gap-[var(--space-xl)]">
              <h2 className="text-display-md text-[var(--color-content)]">{property.neighborhoodName}</h2>
              <p className="text-body-lg text-[var(--color-content)]">{property.neighborhoodDescription}</p>
            </div>
            <QuietAction href={property.neighborhoodDirectionsUrl} external>
              Get Directions
            </QuietAction>
          </AnimateIn>

          <AnimateIn
            from="above"
            delay={0}
            className={`relative min-w-0 w-full max-w-[var(--layout-map-image-max)] flex-1 aspect-square overflow-hidden bg-[var(--color-neutral-200)] lg:order-1 lg:max-w-[var(--layout-map-image-max)] ${MOBILE_FULL_BLEED}`}
          >
            <NeighborhoodMapWrapper />
          </AnimateIn>
        </div>
      </section>

      {/* 5. Explore More — dark */}
      <section
        className={`flex w-full items-center justify-center bg-[var(--color-inverse-surface)] p-[var(--space-4xl)] max-lg:px-[var(--space-md)] ${MOBILE_PY} text-[var(--color-inverse-content)]`}
      >
        <div className="flex w-full max-w-[var(--layout-content-max)] flex-col gap-[var(--space-4xl)] py-[var(--space-xl)] max-lg:py-0">
          <AnimateIn delay={100}>
            <h2 className="text-display-md text-[var(--color-inverse-content)]">Explore More</h2>
          </AnimateIn>

          <div className="flex w-full min-w-0 max-w-full flex-wrap gap-[var(--space-xl)] max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:overscroll-x-contain max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden lg:flex-wrap">
            {property.exploreTiles.map((tile, i) => (
              <AnimateIn
                key={i}
                delay={200 + i * 100}
                className="min-w-0 w-full max-w-[372px] flex-[1_1_280px] max-lg:min-w-[280px] max-lg:max-w-[280px] max-lg:shrink-0 max-lg:flex-none"
              >
                <Link href={tile.href} className="explore-tile-hover group flex flex-col gap-[var(--space-md)]">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={tile.image}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                      sizes="(max-width: 1023px) 280px, 372px"
                    />
                    <div aria-hidden className="corner-light-overlay explore-tile-light" />
                  </div>
                  <div className="flex flex-col gap-[var(--space-xs)]">
                    <span className="text-headline-md text-[var(--color-inverse-content)] transition-colors duration-1000 ease-in-out group-hover:text-[var(--color-inverse-brand)]">
                      {tile.name}
                    </span>
                    <span className="text-body-lg text-[var(--color-inverse-content)]">{tile.city}</span>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={200 + property.exploreTiles.length * 100} className="flex w-full flex-col items-end">
            <QuietAction href="/properties" light>
              View all properties
            </QuietAction>
          </AnimateIn>
        </div>
      </section>

      {/* 6. Contact form */}
      <section
        id="contact-form"
        className={`flex w-full flex-col items-center justify-center bg-[var(--color-background-bright)] p-[var(--space-4xl)] max-lg:px-[var(--space-md)] max-lg:pt-[var(--space-4xl)] ${MOBILE_PB_FLUSH} scroll-mt-[var(--layout-scroll-anchor-offset)]`}
      >
        <div className="flex w-full max-w-[var(--layout-content-max)] flex-col items-stretch gap-[var(--space-3xl)] py-[var(--space-3xl)] max-lg:gap-[var(--space-3xl)] max-lg:py-0 lg:flex-row lg:items-center">
          <AnimateIn
            from="below"
            delay={200}
            className="flex min-w-0 flex-1 flex-col gap-[var(--space-3xl)] p-[var(--space-3xl)] max-lg:w-full max-lg:p-0 lg:order-2 lg:min-w-[var(--layout-contact-col-min)]"
          >
            <h2 className="text-display-md text-[var(--color-content)]">Find the perfect space.</h2>

            <div className="flex flex-wrap gap-[var(--space-2xl)]">
              {FORM_FIELDS.map((field) => (
                <Field
                  key={field.id}
                  className={
                    field.half
                      ? "w-full min-w-0 max-lg:w-full lg:w-[calc(50%-var(--space-lg))] lg:min-w-[var(--layout-form-col-min)]"
                      : "w-full"
                  }
                >
                  <FieldLabel htmlFor={field.id}>{field.label}</FieldLabel>
                  {"multiline" in field && field.multiline ? (
                    <Textarea id={field.id} placeholder={field.placeholder} />
                  ) : (
                    <Input id={field.id} placeholder={field.placeholder} variant="default" size="lg" />
                  )}
                </Field>
              ))}
            </div>

            <Button type="submit" variant="default" size="lg" className="w-fit">
              Send Message
            </Button>
          </AnimateIn>

          <AnimateIn
            from="above"
            delay={200}
            className={`relative min-w-0 w-full max-w-[var(--layout-contact-image-max)] flex-1 aspect-square overflow-hidden max-lg:max-h-none max-lg:max-w-none lg:order-1 lg:aspect-[646/960] lg:max-h-[min(var(--layout-contact-image-height-max),70vh)] lg:max-w-[var(--layout-contact-image-max)] ${MOBILE_FULL_BLEED}`}
          >
            <Image
              src={property.formImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 63.9375rem) 100vw, 40.375rem"
            />
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
