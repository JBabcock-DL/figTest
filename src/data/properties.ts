/**
 * Static property content for SSG property pages.
 *
 * This module is the single source of truth until a CMS or API exists.
 * Copy and image paths mirror Figma (node `35:1383`, file `OrDMGL6zOS3U9qYwXvPAvc`);
 * assets live under `/public/properties/`.
 *
 * @module data/properties
 */

export interface PropertyDetailField {
  label: string
  value: string
}

export interface ExploreTile {
  image: string
  name: string
  city: string
  href: string
}

export interface Property {
  /** URL slug, e.g. "300-river-place" */
  slug: string
  name: string
  /** Address line shown as the subtitle, e.g. "300 River Place | Detroit, MI" */
  address: string
  description: string
  /** Bulleted "Property Information" highlights */
  highlights: string[]
  websiteUrl: string
  /** 750×750 hero image */
  heroImage: string
  /** Carousel slides (1280×960 each) */
  images: string[]
  /** Ordered detail grid: Property Type, Size, Number of Floors, Year Built, Year Acquired, Architect */
  details: PropertyDetailField[]
  // Neighborhood / map section
  neighborhoodName: string
  neighborhoodDescription: string
  neighborhoodDirectionsUrl: string
  mapImage: string
  // Contact form section
  formImage: string
  // Explore More tiles
  exploreTiles: ExploreTile[]
}

const RIVER_PLACE: Property = {
  slug: "300-river-place",
  name: "300 River Place",
  address: "300 River Place | Detroit, MI",
  description:
    "This boutique and storied gem occupies a bustling corner facing the vibrant Hudson’s development, just blocks from Detroit’s iconic Campus Martius and Capitol Park neighborhoods. Its recent rehabilitation boasts meticulous historic preservation and an expansive modern interior renovation––ushering it into an exciting future.",
  highlights: [
    "Boutique, nine-story building",
    "Efficient, 5,500 square-foot floor plates",
    "Second generation, fully built-out multi-floor retail space available",
  ],
  websiteUrl: "https://PropertyWebsite.com",
  heroImage: "/properties/hero-300-river-place.png",
  images: [
    "/properties/carousel-1.png",
    "/properties/carousel-2.png",
    "/properties/carousel-3.png",
    "/properties/carousel-1.png",
    "/properties/carousel-2.png",
    "/properties/carousel-3.png",
  ],
  details: [
    { label: "Property Type", value: "Office, Residential, Retail" },
    { label: "Size", value: "484,000 SF" },
    { label: "Number of Floors", value: "23" },
    { label: "Year Built", value: "1965" },
    { label: "Year Acquired", value: "1993" },
    { label: "Architect", value: "Smith, Hinchman & Grylls" },
  ],
  neighborhoodName: "Campus Martius",
  neighborhoodDescription:
    "When you see a Bedrock building, you see the values and influence of the people who inspired them. You see the energy of the tenants who inhabit them today. And you see a glimpse of what living in our cities looks like moving into the future.",
  neighborhoodDirectionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Campus+Martius+Detroit+MI",
  mapImage: "/properties/map-detroit.png",
  formImage: "/properties/form-building.png",
  exploreTiles: [
    { image: "/properties/tile-1.png", name: "1234 Main St", city: "Detroit, MI", href: "/properties/300-river-place" },
    { image: "/properties/tile-2.png", name: "1234 Main St", city: "Detroit, MI", href: "/properties/300-river-place" },
    { image: "/properties/tile-3.png", name: "1234 Main St", city: "Detroit, MI", href: "/properties/300-river-place" },
    { image: "/properties/tile-4.png", name: "1234 Main St", city: "Detroit, MI", href: "/properties/300-river-place" },
  ],
}

export const PROPERTIES: Property[] = [RIVER_PLACE]

/** The property rendered at the site index (`/`). */
export const DEFAULT_PROPERTY = RIVER_PLACE

/** All properties included in `generateStaticParams`. */
export function getAllProperties(): Property[] {
  return PROPERTIES
}

/**
 * Resolve a property by URL slug (`propertyName` route segment).
 * @param slug - e.g. `"300-river-place"`
 */
export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug)
}
