"use client";

import { useEffect } from "react";
import { latLngBounds } from "leaflet";
import { useMap } from "react-leaflet";

export function FitDormBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length === 0) return;

    if (positions.length === 1) {
      map.setView(positions[0], 15, { animate: false });
    } else {
      map.fitBounds(latLngBounds(positions), {
        animate: false,
        padding: [48, 48],
        maxZoom: 13,
      });
    }
  }, [map, positions]);

  return null;
}
