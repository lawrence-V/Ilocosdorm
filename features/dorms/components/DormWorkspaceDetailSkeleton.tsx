import { Skeleton } from "@/components/ui/skeleton";

export function DormWorkspaceDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8" aria-label="Loading dorm details">
      <Skeleton className="h-8 w-32" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-14 w-full max-w-2xl" />
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>
      <Skeleton className="aspect-[16/9] w-full rounded-2xl md:aspect-[16/7]" />
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-28 w-full" />
        </div>
        <Skeleton className="h-72 w-full rounded-2xl" />
      </div>
    </div>
  );
}
