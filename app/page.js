"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import toast from "react-hot-toast";
import { api, CATEGORIES } from "@/lib/api";
import useTitle from "@/lib/useTitle";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";

const slides = [
  { title: "A library that fits in your pocket", text: "Browse every book shared by readers like you and pick your next read in minutes.", bg: "bg-primary text-primary-content" },
  { title: "Got a book gathering dust?", text: "Add it to BookNook and let someone else enjoy it. You choose how many copies are open.", bg: "bg-accent text-accent-content" },
  { title: "Borrow now, return when done", text: "Every loan lasts seven days. Return early and the copy goes straight back on the shelf.", bg: "bg-neutral text-neutral-content" },
];
const steps = [
  ["Find a book", "Browse All Books or filter by category."],
  ["Borrow it", "Confirm in one click. It is yours for 7 days."],
  ["Return it", "Open My Borrows and press Return Book."],
];

export default function Home() {
  useTitle("Home");
  const [books, setBooks] = useState(null);
  useEffect(() => { api("/books?limit=6").then(setBooks).catch((e) => { toast.error(e.message); setBooks([]); }); }, []);

  return (
    <>
      <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 5000 }} pagination={{ clickable: true }} loop>
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className={`${s.bg} px-4 py-20 md:py-28`}>
              <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl space-y-5">
                  <h2 className="text-4xl md:text-6xl font-bold leading-tight" style={{ fontFamily: "var(--font-head)" }}>{s.title}</h2>
                  <p className="text-lg opacity-90">{s.text}</p>
                  <Link href="/books" className="btn btn-secondary">Browse Books</Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className="page">
        <h2 className="h-section mb-6">New Arrivals</h2>
        {!books ? <Spinner /> : books.length === 0 ? <p className="opacity-80">No books yet. Be the first to add one.</p> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{books.map((b) => <BookCard key={b._id} book={b} />)}</div>
        )}
        <div className="text-center mt-8"><Link href="/books" className="btn btn-primary">See All Books</Link></div>
      </section>

      <section className="page">
        <h2 className="h-section mb-6">How borrowing works</h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="card bg-base-100 border border-base-300 h-full"><div className="card-body">
              <span className="badge badge-primary">Step {i + 1}</span><h3 className="card-title">{t}</h3><p>{d}</p>
            </div></li>
          ))}
        </ol>
      </section>

      <section className="page">
        <h2 className="h-section mb-6">Top categories</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link key={c} href={`/books?category=${c}`} className="card bg-base-100 border border-base-300 hover:border-primary transition-colors">
              <div className="card-body items-center py-8"><h3 className="font-semibold">{c}</h3></div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
