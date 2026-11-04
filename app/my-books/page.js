"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";
import BookForm from "@/components/BookForm";
import Spinner from "@/components/Spinner";

function MyBooks({ user }) {
  const [books, setBooks] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const load = () => api(`/books?email=${encodeURIComponent(user.email)}`).then(setBooks).catch((e) => { toast.error(e.message); setBooks([]); });
  useEffect(() => { load(); }, []);

  async function remove() {
    try {
      await api(`/books/${deleting._id}`, { method: "DELETE", auth: true });
      setBooks((b) => b.filter((x) => x._id !== deleting._id));
      toast.success("Book deleted");
    } catch (e) { toast.error(e.message); }
    setDeleting(null);
  }
  if (!books) return <Spinner />;

  return (
    <div className="page">
      <h1 className="h-section mb-6">My books</h1>
      {books.length === 0 ? (
        <p>You have not added any books yet. <Link href="/add-book" className="link link-primary">Add your first book</Link></p>
      ) : (
        <div className="overflow-x-auto card bg-base-100 border border-base-300">
          <table className="table">
            <thead><tr><th>Cover</th><th>Title</th><th>Category</th><th>Copies</th><th>Actions</th></tr></thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id}>
                  <td><img src={b.image} alt={b.title} className="w-12 h-16 object-cover rounded" /></td>
                  <td>{b.title}<div className="text-xs opacity-70">{b.author}</div></td>
                  <td>{b.category}</td>
                  <td>{b.availableCopies}/{b.totalCopies}</td>
                  <td className="space-x-2 whitespace-nowrap">
                    <button onClick={() => setEditing(b)} className="btn btn-sm btn-primary">Edit</button>
                    <button onClick={() => setDeleting(b)} className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog className={`modal ${editing ? "modal-open" : ""}`}>
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Edit book</h3>
          {editing && (
            <BookForm key={editing._id} initial={editing} user={user} submitLabel="Save changes" onSubmit={async (data) => {
              await api(`/books/${editing._id}`, { method: "PATCH", body: data, auth: true });
              toast.success("Book updated");
              setEditing(null); load();
            }} />
          )}
          <div className="modal-action"><button onClick={() => setEditing(null)} className="btn">Close</button></div>
        </div>
      </dialog>

      <dialog className={`modal ${deleting ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete this book?</h3>
          <p className="py-3">“{deleting?.title}” and its borrow records will be removed. This cannot be undone.</p>
          <div className="modal-action">
            <button onClick={() => setDeleting(null)} className="btn">Cancel</button>
            <button onClick={remove} className="btn btn-error">Delete book</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
export default function Page() { useTitle("My Books"); return <PrivateRoute>{(user) => <MyBooks user={user} />}</PrivateRoute>; }
