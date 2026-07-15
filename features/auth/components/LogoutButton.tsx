"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOutIcon, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "@/services/authService";

type LogoutButtonProps = {
  compact?: boolean;
  className?: string;
};

export function LogoutButton({ compact = false, className }: LogoutButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    setIsPending(true);

    try {
      await signOut();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to log out.");
      setIsPending(false);
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size={compact ? "icon" : "default"}
      className={cn(!compact && "justify-start", className)}
      disabled={isPending}
      aria-label={compact ? "Log out" : undefined}
      onClick={handleLogout}
    >
      {isPending ? (
        <LoaderCircleIcon className="animate-spin" data-icon="inline-start" />
      ) : (
        <LogOutIcon data-icon="inline-start" />
      )}
      {!compact && (isPending ? "Logging out…" : "Log out")}
    </Button>
  );
}
