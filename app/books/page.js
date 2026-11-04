"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api, CATEGORIES } from "@/lib/api";
import useTitle from "@/lib/useTitle";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";

export default function Books() {
  useTitle("All Books");
  const [books, setBooks] = useState(null);
  const [cat, setCat] = useState("All");
  useEffect(() => {
    setCat(new URLSearchParams(window.location.search).get("category") || "All");
    api("/books").then(setBooks).catch((e) => { toast.error(e.message); setBooks([]); });
  }, []);
  const shown = books?.filter((b) => cat === "All" || b.category === cat);

  return (
    <div className="page">
      <h1 className="h-section mb-4">All Books</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", ...CATEGORIES].map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`btn btn-sm ${cat === c ? "btn-primary" : "btn-outline"}`}>{c}</button>
        ))}
      </div>
      {!shown ? <Spinner /> : shown.length === 0 ? <p className="opacity-80">No books in this category yet.</p> : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{shown.map((b) => <BookCard key={b._id} book={b} />)}</div>
      )}
    </div>
  );
}
