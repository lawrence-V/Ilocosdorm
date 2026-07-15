"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MobileNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className="size-11 sm:hidden"
            variant="outline"
            size="icon-lg"
            aria-label="Open navigation"
          />
        }
      >
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-52 p-2">
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/dorms" />}>Explore dorms</DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/login" />}>Owner sign in</DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/register" />}>List your dorm</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
