"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";
import BookForm from "@/components/BookForm";

export default function AddBook() {
  useTitle("Add Book");
  const router = useRouter();
  return (
    <PrivateRoute>
      {(user) => (
        <div className="page max-w-3xl">
          <h1 className="h-section mb-6">Add a book</h1>
          <div className="card bg-base-100 border border-base-300 card-body">
            <BookForm user={user} submitLabel="Add Book" onSubmit={async (data) => {
              await api("/books", { method: "POST", body: data, auth: true });
              toast.success("Book added to the library");
              router.push("/my-books");
            }} />
          </div>
        </div>
      )}
    </PrivateRoute>
  );
}
