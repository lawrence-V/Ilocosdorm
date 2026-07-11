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
    <form className="grid gap-4 border-y py-5 md:grid-cols-3 lg:grid-cols-6 lg:items-end">
      <FieldGroup className="contents">
        <Field className="lg:col-span-2">
          <FieldLabel htmlFor="query">Search</FieldLabel>
          <Input
            id="query"
            name="query"
            defaultValue={filters.query}
            placeholder="Dorm, city, or address"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="city">City</FieldLabel>
          <Select name="city" defaultValue={filters.city}>
            <SelectTrigger id="city" className="w-full">
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
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="gender">Residents</FieldLabel>
          <Select name="gender" defaultValue={filters.gender}>
            <SelectTrigger id="gender" className="w-full">
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
        <Button type="submit">
          <SearchIcon data-icon="inline-start" />
          Apply filters
        </Button>
      </FieldGroup>
    </form>
  );
}
