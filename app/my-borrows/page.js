"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api, fmt } from "@/lib/api";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";

function MyBorrows() {
  const [rows, setRows] = useState(null);
  useEffect(() => { api("/borrows", { auth: true }).then(setRows).catch((e) => { toast.error(e.message); setRows([]); }); }, []);

  async function giveBack(id) {
    try {
      await api(`/borrows/${id}`, { method: "DELETE", auth: true });
      setRows((r) => r.filter((x) => x._id !== id));
      toast.success("Book returned. Thank you!");
    } catch (e) { toast.error(e.message); }
  }
  if (!rows) return <Spinner />;

  return (
    <div className="page">
      <h1 className="h-section mb-6">My borrows</h1>
      {rows.length === 0 ? (
        <p>You have no borrowed books. <Link href="/books" className="link link-primary">Find a book to borrow</Link></p>
      ) : (
        <div className="overflow-x-auto card bg-base-100 border border-base-300">
          <table className="table">
            <thead><tr><th>Cover</th><th>Title</th><th>Borrow date</th><th>Return date</th><th></th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r._id}>
                  <td><img src={r.bookImage} alt={r.bookTitle} className="w-12 h-16 object-cover rounded" /></td>
                  <td>{r.bookTitle}</td><td>{fmt(r.borrowDate)}</td><td>{fmt(r.returnDate)}</td>
                  <td><button onClick={() => giveBack(r._id)} className="btn btn-sm btn-primary">Return Book</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default function Page() { useTitle("My Borrows"); return <PrivateRoute>{() => <MyBorrows />}</PrivateRoute>; }
