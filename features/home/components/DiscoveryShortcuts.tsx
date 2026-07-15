import Link from "next/link";
import {
  CookingPotIcon,
  PhilippinePesoIcon,
  SnowflakeIcon,
  UsersIcon,
  WifiIcon,
} from "lucide-react";

const SHORTCUTS = [
  {
    href: "/dorms?maxPrice=3500",
    label: "Under ₱3,500",
    icon: PhilippinePesoIcon,
  },
  {
    href: "/dorms?maxPrice=5000",
    label: "Under ₱5,000",
    icon: PhilippinePesoIcon,
  },
  { href: "/dorms?amenities=wifi", label: "Wi-Fi", icon: WifiIcon },
  {
    href: "/dorms?amenities=air-conditioning",
    label: "Air conditioning",
    icon: SnowflakeIcon,
  },
  { href: "/dorms?amenities=kitchen", label: "Kitchen", icon: CookingPotIcon },
  { href: "/dorms?gender=female", label: "Female residents", icon: UsersIcon },
] as const;

export function DiscoveryShortcuts() {
  return (
    <nav className="mt-8" aria-label="Popular dorm filters">
      <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 md:mx-auto md:grid md:max-w-5xl md:grid-cols-6 md:px-0">
        {SHORTCUTS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex min-h-24 w-36 shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-2xl bg-background px-3 py-4 text-center text-sm font-semibold ring-1 ring-primary/10 transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-card hover:shadow-[0_18px_42px_-32px_oklch(0.39_0.14_260_/_0.45)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px md:w-auto"
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.7}
              className="size-5 text-primary transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
            />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
