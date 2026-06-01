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
  { id: "first-name", label: "First Name", half: true },
  { id: "last-name", label: "Last Name", half: true },
  { id: "email", label: "Email", half: true },
  { id: "phone", label: "Phone", half: true },
  { id: "company-name", label: "Company Name", half: false },
  { id: "message", label: "Message", half: false, multiline: true },
] as const

const FORM_PLACEHOLDER = "you@example.com"

const QUIET_HOVER =
  "p-[var(--space-xs)] transition-colors duration-200 ease-in-out hover:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]"

/** Quiet (text + 24px arrow) action — the design's "button size/quiet". */
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
    <div className="w-full bg-[var(--color-background-bright)] text-[var(--color-content)]">
      {/* 1. Hero */}
      <section className="flex w-full flex-col items-center px-[var(--space-4xl)] pt-[160px]">
        <div className="flex w-full max-w-[1560px] flex-wrap items-start gap-[var(--space-4xl)]">
          <AnimateIn className="flex min-w-[500px] flex-1 flex-col gap-[var(--space-2xl)] pr-[var(--space-4xl)]">
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

            <div className="flex flex-col gap-[var(--space-xs)]">
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

          <AnimateIn variant="scale" className="relative size-[750px] shrink-0 overflow-hidden">
            <Image
              src={property.heroImage}
              alt={property.name}
              fill
              className="object-cover"
              sizes="750px"
              priority
            />
          </AnimateIn>
        </div>
      </section>

      {/* 2. Property Details — dark */}
      <section className="flex w-full items-center justify-center bg-[var(--color-inverse-surface)] p-[var(--space-4xl)] text-[var(--color-inverse-content)]">
        <div className="flex w-full max-w-[1560px] flex-wrap items-start justify-between gap-y-[64px] py-[var(--space-xl)]">
          <div className="flex min-w-[350px] max-w-[650px] flex-1 flex-col gap-[var(--space-2xl)]">
            <AnimateIn delay={100}>
              <h2 className="text-display-lg text-[var(--color-inverse-content)]">Property Details</h2>
            </AnimateIn>
            <AnimateIn delay={200}>
              <QuietAction href="#contact-form" light>
                Contact for more info
              </QuietAction>
            </AnimateIn>
          </div>

          <dl className="flex min-w-[400px] flex-1 flex-wrap gap-[var(--space-4xl)]">
            {property.details.map((field, i) => (
              <AnimateIn key={field.label} delay={200 + i * 100} className="flex w-[250px] flex-col gap-[var(--space-sm)]">
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
      <section className="w-full">
        <CarouselReveal>
          <PropertyCarousel images={property.images} />
        </CarouselReveal>
      </section>

      {/* 4. Map + Neighborhood */}
      <section className="flex w-full flex-col items-center justify-center px-[var(--space-4xl)] py-[160px]">
        <div className="flex w-full max-w-[1560px] flex-wrap items-center gap-[var(--space-4xl)] bg-[var(--color-background-bright)]">
          <AnimateIn from="above" delay={0} className="relative size-[712px] shrink-0 overflow-hidden bg-[#d9d9d9]">
            <NeighborhoodMapWrapper />
          </AnimateIn>

          <AnimateIn
            from="below"
            delay={0}
            className="flex min-w-[500px] flex-1 flex-col gap-[var(--space-3xl)] p-[var(--space-4xl)]"
          >
            <div className="flex flex-col gap-[var(--space-xl)]">
              <h2 className="text-display-lg text-[var(--color-content)]">{property.neighborhoodName}</h2>
              <p className="text-body-lg text-[var(--color-content)]">{property.neighborhoodDescription}</p>
            </div>
            <QuietAction href={property.neighborhoodDirectionsUrl} external>
              Get Directions
            </QuietAction>
          </AnimateIn>
        </div>
      </section>

      {/* 5. Explore More — dark */}
      <section className="flex w-full items-center justify-center bg-[var(--color-inverse-surface)] p-[var(--space-4xl)] text-[var(--color-inverse-content)]">
        <div className="flex w-full max-w-[1560px] flex-col gap-[var(--space-4xl)] py-[var(--space-xl)]">
          <AnimateIn delay={100}>
            <h2 className="text-display-lg text-[var(--color-inverse-content)]">Explore More</h2>
          </AnimateIn>

          <div className="flex flex-wrap gap-[var(--space-xl)]">
            {property.exploreTiles.map((tile, i) => (
              <AnimateIn key={i} delay={200 + i * 100} className="w-[372px]">
                <Link href={tile.href} className="explore-tile-hover group flex flex-col gap-[var(--space-md)]">
                  <div className="relative size-[372px] overflow-hidden">
                    <Image
                      src={tile.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                      sizes="372px"
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
        className="flex w-full flex-col items-center justify-center bg-[var(--color-background-bright)] p-[var(--space-4xl)] scroll-mt-[120px]"
      >
        <div className="flex w-full max-w-[1560px] flex-wrap items-center gap-[var(--space-3xl)] py-[var(--space-3xl)]">
          <AnimateIn
            from="above"
            delay={200}
            className="relative h-[960px] min-w-[600px] max-w-[646px] flex-1 overflow-hidden"
          >
            <Image
              src={property.formImage}
              alt=""
              fill
              className="object-cover"
              sizes="646px"
            />
          </AnimateIn>

          <AnimateIn
            from="below"
            delay={200}
            className="flex min-w-[600px] flex-1 flex-col gap-[var(--space-3xl)] p-[var(--space-3xl)]"
          >
            <h2 className="text-display-lg text-[var(--color-content)]">Find the perfect space.</h2>

            <div className="flex flex-wrap gap-[var(--space-2xl)]">
              {FORM_FIELDS.map((field) => (
                <Field
                  key={field.id}
                  className={field.half ? "w-[calc(50%-16px)] min-w-[240px]" : "w-full"}
                >
                  <FieldLabel htmlFor={field.id}>{field.label}</FieldLabel>
                  {"multiline" in field && field.multiline ? (
                    <Textarea id={field.id} placeholder={FORM_PLACEHOLDER} />
                  ) : (
                    <Input id={field.id} placeholder={FORM_PLACEHOLDER} variant="default" size="lg" />
                  )}
                </Field>
              ))}
            </div>

            <Button type="submit" variant="default" size="lg" className="w-fit">
              Send Message
            </Button>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
