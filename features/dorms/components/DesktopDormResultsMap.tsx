"use client";

import { useSyncExternalStore } from "react";

import { DormResultsMap } from "@/features/dorms/components/DormResultsMap";
import type { DormMapListing } from "@/types/Dorm";

const DESKTOP_MEDIA_QUERY = "(min-width: 64rem)";

function subscribeToDesktopViewport(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function DesktopDormResultsMap({ dorms }: { dorms: DormMapListing[] }) {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopSnapshot,
    getServerSnapshot,
  );

  if (!isDesktop) return null;

  return <DormResultsMap dorms={dorms} />;
}
