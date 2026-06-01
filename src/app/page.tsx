import { PropertyDetail } from "@/components/layout/property-detail";
import { DEFAULT_PROPERTY } from "@/data/properties";

// The property detail page is the site index.
export default function Home() {
  return <PropertyDetail property={DEFAULT_PROPERTY} />;
}
