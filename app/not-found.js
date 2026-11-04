"use client";
import Link from "next/link";
import useTitle from "@/lib/useTitle";
export default function NotFound() {
  useTitle("Page Not Found");
  return (
    <div className="page text-center py-24 space-y-4">
      <p className="text-7xl font-bold text-primary" style={{ fontFamily: "var(--font-head)" }}>404</p>
      <h1 className="h-section">This shelf is empty</h1>
      <p className="opacity-80">The page you are looking for does not exist or was moved.</p>
      <Link href="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
