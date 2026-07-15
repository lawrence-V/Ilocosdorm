"use client";

import { useEffect } from "react";
import { latLngBounds } from "leaflet";
import { useMap } from "react-leaflet";

export function FitDormBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    map.stop();

    if (positions.length === 0) {
      return () => {
        map.stop();
      };
    }

    if (positions.length === 1) {
      map.setView(positions[0], 15, { animate: false });
    } else {
      map.fitBounds(latLngBounds(positions), {
        animate: false,
        padding: [48, 48],
        maxZoom: 13,
      });
    }

    return () => {
      map.stop();
    };
  }, [map, positions]);

  return null;
}
