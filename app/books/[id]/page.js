"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api, fmt } from "@/lib/api";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";

function Details({ user }) {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  useTitle(book ? book.title : "Book Details");
  const load = () => api(`/books/${id}`).then(setBook).catch((e) => { toast.error(e.message); router.replace("/books"); });
  useEffect(() => { load(); }, [id]);

  async function borrow(e) {
    e.preventDefault(); setBusy(true);
    try {
      await api("/borrows", { method: "POST", body: { bookId: id }, auth: true });
      toast.success("Book borrowed. Return it within 7 days");
      setOpen(false); load();
    } catch (err) { toast.error(err.message); setOpen(false); } finally { setBusy(false); }
  }
  if (!book) return <Spinner />;
  const none = book.availableCopies < 1;

  return (
    <div className="page grid gap-8 md:grid-cols-[320px_1fr]">
      <img src={book.image} alt={book.title} className="w-full h-96 object-cover rounded-box border border-base-300" />
      <div className="space-y-4">
        <h1 className="h-section">{book.title}</h1>
        <p className="text-lg">by {book.author}</p>
        <div className="flex gap-2"><span className="badge badge-outline">{book.category}</span><span className="badge badge-ghost">{book.availableCopies} of {book.totalCopies} copies available</span></div>
        <p className="max-w-prose leading-relaxed">{book.description}</p>
        <p className="text-sm opacity-80">Added by {book.addedBy.name} on {fmt(book.createdAt)}</p>
        <button disabled={none} onClick={() => setOpen(true)} className="btn btn-primary">{none ? "Not Available" : "Borrow This Book"}</button>
      </div>

      <dialog className={`modal ${open ? "modal-open" : ""}`}>
        <form onSubmit={borrow} className="modal-box space-y-3">
          <h3 className="font-bold text-lg">Borrow “{book.title}”</h3>
          <input readOnly value={user.name} className="input input-bordered w-full bg-base-200" />
          <input readOnly value={user.email} className="input input-bordered w-full bg-base-200" />
          <div className="modal-action">
            <button type="button" onClick={() => setOpen(false)} className="btn">Cancel</button>
            <button disabled={busy} className="btn btn-primary">{busy ? <span className="loading loading-spinner" /> : "Confirm Borrow"}</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
export default function Page() { return <PrivateRoute>{(user) => <Details user={user} />}</PrivateRoute>; }
