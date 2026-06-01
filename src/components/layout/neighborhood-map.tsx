"use client"

import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

// Fix broken default marker icons in Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
})

const POSITION: [number, number] = [42.3314, -83.0458]

export default function NeighborhoodMap() {
  return (
    <MapContainer
      center={POSITION}
      zoom={14}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
      aria-label="Neighborhood map for 300 River Place, Detroit MI"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <Marker position={POSITION}>
        <Popup>300 River Place, Detroit MI</Popup>
      </Marker>
    </MapContainer>
  )
}
