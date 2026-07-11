import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="font-heading text-2xl font-semibold tracking-tight text-primary"
      aria-label="IlocosDorm home"
    >
      IlocosDorm
    </Link>
  );
}
