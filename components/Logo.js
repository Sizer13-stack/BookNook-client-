import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="4" height="18" rx="1" className="fill-primary" />
        <rect x="9" y="6" width="4" height="15" rx="1" className="fill-secondary" />
        <rect x="15" y="4" width="4" height="17" rx="1" className="fill-accent" transform="rotate(8 17 12)" />
      </svg>
      <span className="font-bold text-xl" style={{ fontFamily: "var(--font-head)" }}>BookNook</span>
    </Link>
  );
}
