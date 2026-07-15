import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="text-xl font-extrabold tracking-[-0.045em] text-primary sm:text-2xl"
      aria-label="IlocosDorm home"
    >
      Ilocos<span className="text-primary/65">Dorm</span>
    </Link>
  );
}
