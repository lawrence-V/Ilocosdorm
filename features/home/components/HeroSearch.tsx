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
    <form
      action="/dorms"
      className="grid gap-4 bg-background p-5 text-foreground shadow-xl md:grid-cols-[1.2fr_1fr_1fr_auto] md:items-end"
    >
      <FieldGroup className="contents">
        <Field>
          <FieldLabel htmlFor="hero-location">Location</FieldLabel>
          <Input id="hero-location" name="query" placeholder="City, school, or barangay" />
        </Field>
        <Field>
          <FieldLabel htmlFor="hero-city">City</FieldLabel>
          <Select name="city">
            <SelectTrigger id="hero-city" className="w-full">
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
            <SelectTrigger id="hero-budget" className="w-full">
              <SelectValue placeholder="Select budget" />
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
        <Button type="submit" size="lg">
          <SearchIcon data-icon="inline-start" />
          Search dorms
        </Button>
      </FieldGroup>
      <input type="hidden" name="sort" value="newest" />
    </form>
  );
}
