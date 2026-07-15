"use client";

import { useEffect } from "react";
import { divIcon, type LeafletEvent, Marker as LeafletMarker } from "leaflet";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const LOCATION_PIN_ICON = divIcon({
  className: "listing-location-marker",
  html: `
    <svg viewBox="0 0 44 52" width="44" height="52" aria-hidden="true" focusable="false">
      <path
        d="M22 2C11.5 2 3 10.5 3 21c0 13.8 19 29 19 29s19-15.2 19-29C41 10.5 32.5 2 22 2Z"
        fill="var(--primary, #315fba)"
        stroke="var(--card, #ffffff)"
        stroke-width="3"
      />
      <circle cx="22" cy="21" r="7" fill="var(--primary-foreground, #ffffff)" />
    </svg>
  `,
  iconSize: [44, 52],
  iconAnchor: [22, 46],
});

export default function ListingLocationLeafletMap({
  latitude,
  longitude,
  onPositionChange,
}: {
  latitude: number;
  longitude: number;
  onPositionChange: (latitude: number, longitude: number) => void;
}) {
  const position: [number, number] = [latitude, longitude];

  const handleDragEnd = (event: LeafletEvent) => {
    const marker = event.target as LeafletMarker;
    const nextPosition = marker.getLatLng();
    onPositionChange(nextPosition.lat, nextPosition.lng);
  };

  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom
      className="h-[360px] w-full"
      aria-label="Choose the property location"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapPositionController position={position} onPositionChange={onPositionChange} />
      <Marker
        position={position}
        icon={LOCATION_PIN_ICON}
        draggable
        keyboard
        zIndexOffset={1000}
        title="Drag to set the property location"
        alt="Property location pin"
        eventHandlers={{ dragend: handleDragEnd }}
      />
    </MapContainer>
  );
}

function MapPositionController({
  position,
  onPositionChange,
}: {
  position: [number, number];
  onPositionChange: (latitude: number, longitude: number) => void;
}) {
  const map = useMap();

  useMapEvents({
    click(event) {
      onPositionChange(event.latlng.lat, event.latlng.lng);
    },
  });

  useEffect(() => {
    const center = map.getCenter();
    const moved = Math.abs(center.lat - position[0]) > 0.000001;
    const movedEastWest = Math.abs(center.lng - position[1]) > 0.000001;

    if (moved || movedEastWest) {
      map.panTo(position, { animate: false });
    }
  }, [map, position]);

  return null;
}
