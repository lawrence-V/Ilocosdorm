"use client";

import { useMemo } from "react";
import Link from "next/link";
import { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { FitDormBounds } from "@/features/dorms/components/FitDormBounds";
import type { DormMapListing } from "@/types/Dorm";
import { formatCurrency } from "@/utils/formatCurrency";

import "leaflet/dist/leaflet.css";

const ILOCOS_CENTER: [number, number] = [17.95, 120.58];

export default function DormPriceMap({ dorms }: { dorms: DormMapListing[] }) {
  const positions = useMemo(
    () => dorms.map((dorm) => [dorm.latitude, dorm.longitude] as [number, number]),
    [dorms],
  );

  return (
    <MapContainer
      center={positions[0] ?? ILOCOS_CENTER}
      zoom={dorms.length === 1 ? 15 : 9}
      scrollWheelZoom
      fadeAnimation={false}
      markerZoomAnimation={false}
      zoomAnimation={false}
      className="h-full min-h-[420px] w-full"
      aria-label="Map showing dorm prices and locations"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitDormBounds positions={positions} />
      {dorms.map((dorm) => (
        <Marker
          key={dorm.id}
          position={[dorm.latitude, dorm.longitude]}
          icon={createPriceIcon(dorm.monthlyPrice)}
          title={`${dorm.name}, ${formatCurrency(dorm.monthlyPrice)} per month`}
        >
          <Popup className="dorm-map-popup" minWidth={230}>
            <div className="space-y-2 py-1 font-sans">
              <p className="text-base leading-tight font-semibold text-foreground">{dorm.name}</p>
              <p className="text-xs leading-5 text-muted-foreground">{dorm.address}</p>
              <p className="text-base font-bold text-primary tabular-nums">
                {formatCurrency(dorm.monthlyPrice)}
                <span className="text-xs font-normal text-muted-foreground"> / month</span>
              </p>
              <Link
                href={`/dorms/${dorm.slug}`}
                className="inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px"
              >
                View dorm
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function createPriceIcon(monthlyPrice: number) {
  return divIcon({
    className: "dorm-price-marker",
    html: `<span>${formatCurrency(monthlyPrice)}</span>`,
    iconSize: [96, 38],
    iconAnchor: [48, 19],
    popupAnchor: [0, -20],
  });
}
