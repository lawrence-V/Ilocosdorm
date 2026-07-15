export function DashboardMetricStrip({
  items,
}: {
  items: Array<{ label: string; value: number }>;
}) {
  return (
    <dl className="mt-8 grid overflow-hidden rounded-2xl bg-secondary/65 ring-1 ring-foreground/8 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-baseline justify-between gap-4 border-b p-5 last:border-b-0 sm:block sm:border-r sm:border-b-0 sm:p-6 sm:last:border-r-0"
        >
          <dt className="text-sm font-medium text-muted-foreground">{item.label}</dt>
          <dd className="text-3xl font-semibold tracking-[-0.035em] sm:mt-3">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
