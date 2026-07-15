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

export function HeroSearch() {
  return (
    <div className="rounded-[1.75rem] bg-primary/6 p-1.5 ring-1 ring-primary/12">
      <form
        action="/dorms"
        className="rounded-[calc(1.75rem-0.375rem)] bg-background p-4 shadow-[0_24px_65px_-45px_oklch(0.39_0.14_260_/_0.5)] sm:p-5"
      >
        <FieldGroup className="grid gap-4 md:grid-cols-[minmax(0,2fr)_1fr_1fr_auto] md:items-end">
          <Field>
            <FieldLabel htmlFor="hero-location">School or area</FieldLabel>
            <Input
              id="hero-location"
              name="query"
              placeholder="MMSU, Laoag, or a barangay"
              className="h-12 rounded-xl bg-secondary/45 px-4"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="hero-city">City</FieldLabel>
            <Select name="city">
              <SelectTrigger id="hero-city" className="h-12 w-full rounded-xl bg-secondary/45">
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
            <FieldLabel htmlFor="hero-budget">Monthly budget</FieldLabel>
            <Select name="maxPrice">
              <SelectTrigger id="hero-budget" className="h-12 w-full rounded-xl bg-secondary/45">
                <SelectValue placeholder="Any budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="3500">Up to ₱3,500</SelectItem>
                  <SelectItem value="5000">Up to ₱5,000</SelectItem>
                  <SelectItem value="7500">Up to ₱7,500</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Button type="submit" size="lg" className="h-12 rounded-xl px-5">
            <SearchIcon data-icon="inline-start" />
            Search
          </Button>
        </FieldGroup>
        <input type="hidden" name="sort" value="newest" />
      </form>
    </div>
  );
}
