"use client";

import { useState } from "react";
import { ListIcon, MapIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DormResultsMap } from "@/features/dorms/components/DormResultsMap";
import type { DormMapListing } from "@/types/Dorm";

export function MobileDormResultsMap({ dorms }: { dorms: DormMapListing[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Button
        type="button"
        variant={isOpen ? "secondary" : "outline"}
        size="lg"
        className="h-11 rounded-full px-5"
        aria-expanded={isOpen}
        aria-controls="mobile-results-map"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <ListIcon data-icon="inline-start" /> : <MapIcon data-icon="inline-start" />}
        {isOpen ? "Hide map" : "Map view"}
      </Button>

      {isOpen ? (
        <div
          id="mobile-results-map"
          className="mt-5 h-[65dvh] min-h-[460px] overflow-hidden rounded-[1.5rem] bg-primary/5 p-1 ring-1 ring-primary/10"
        >
          <div className="h-full overflow-hidden rounded-[calc(1.5rem-0.25rem)]">
            <DormResultsMap dorms={dorms} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
