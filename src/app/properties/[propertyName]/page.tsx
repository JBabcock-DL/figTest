import { notFound } from "next/navigation"

import { PropertyDetail } from "@/components/layout/property-detail"
import { getAllProperties, getPropertyBySlug } from "@/data/properties"

export function generateStaticParams() {
  return getAllProperties().map((property) => ({ propertyName: property.slug }))
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ propertyName: string }>
}) {
  const { propertyName } = await params
  const property = getPropertyBySlug(propertyName)

  if (!property) {
    notFound()
  }

  return <PropertyDetail property={property} />
}
