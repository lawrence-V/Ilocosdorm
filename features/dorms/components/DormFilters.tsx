import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ILOCOS_CITIES } from "@/constants/amenities";
import type { DormFilters as DormFiltersType } from "@/types/Dorm";

export function DormFilters({ filters }: { filters: DormFiltersType }) {
  return (
    <div className="rounded-[1.75rem] bg-primary/6 p-1.5 ring-1 ring-primary/12">
      <form className="rounded-[calc(1.75rem-0.375rem)] bg-background p-4 shadow-[0_24px_65px_-48px_oklch(0.39_0.14_260_/_0.45)] sm:p-5">
        <FieldGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_1fr_1fr_1fr_auto] lg:items-end">
          <Field>
            <FieldLabel htmlFor="query">School or area</FieldLabel>
            <Input
              id="query"
              name="query"
              defaultValue={filters.query}
              placeholder="Dorm, school, city, or address"
              className="h-12 rounded-xl bg-secondary/45 px-4"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Select name="city" defaultValue={filters.city}>
              <SelectTrigger id="city" className="h-12 w-full rounded-xl bg-secondary/45">
                <SelectValue placeholder="Any city" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ILOCOS_CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="maxPrice">Max budget</FieldLabel>
            <Input
              id="maxPrice"
              name="maxPrice"
              type="number"
              min="0"
              defaultValue={filters.maxPrice}
              placeholder="₱5,000"
              className="h-12 rounded-xl bg-secondary/45 px-4"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="gender">Residents</FieldLabel>
            <Select name="gender" defaultValue={filters.gender}>
              <SelectTrigger id="gender" className="h-12 w-full rounded-xl bg-secondary/45">
                <SelectValue placeholder="Any policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Button type="submit" size="lg" className="h-12 rounded-xl px-5">
            <SearchIcon data-icon="inline-start" />
            Search
          </Button>
        </FieldGroup>
        {filters.amenities?.map((amenity) => (
          <input key={amenity} type="hidden" name="amenities" value={amenity} />
        ))}
      </form>
    </div>
  );
}
