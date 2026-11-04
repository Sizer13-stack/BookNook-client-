"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { CATEGORIES, uploadImage } from "@/lib/api";

export default function BookForm({ initial, user, submitLabel, onSubmit }) {
  const [busy, setBusy] = useState(false);
  async function handle(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    try {
      let image = initial?.image;
      const file = f.get("image");
      if (file && file.size) image = await uploadImage(file);
      if (!image) throw new Error("Choose a cover image for the book");
      await onSubmit({
        title: f.get("title"), author: f.get("author"), category: f.get("category"),
        description: f.get("description"), totalCopies: Number(f.get("totalCopies")), image,
      });
    } catch (err) { toast.error(err.message); } finally { setBusy(false); }
  }
  const field = "input input-bordered w-full";
  return (
    <form onSubmit={handle} className="grid gap-4 md:grid-cols-2">
      <label className="form-control">Book title<input name="title" required defaultValue={initial?.title} className={field} /></label>
      <label className="form-control">Author name<input name="author" required defaultValue={initial?.author} className={field} /></label>
      <label className="form-control">Category
        <select name="category" required defaultValue={initial?.category || ""} className="select select-bordered w-full">
          <option value="" disabled>Select a category</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <label className="form-control">Total copies<input name="totalCopies" type="number" min="1" required defaultValue={initial?.totalCopies || 1} className={field} /></label>
      <label className="form-control md:col-span-2">Book image{initial && " (leave empty to keep the current one)"}
        <input name="image" type="file" accept="image/*" className="file-input file-input-bordered w-full" />
      </label>
      <label className="form-control md:col-span-2">Short description
        <textarea name="description" required defaultValue={initial?.description} rows={4} className="textarea textarea-bordered w-full" />
      </label>
      <label className="form-control">Your name<input readOnly value={user.name} className={`${field} bg-base-200`} /></label>
      <label className="form-control">Your email<input readOnly value={user.email} className={`${field} bg-base-200`} /></label>
      <button disabled={busy} className="btn btn-primary md:col-span-2">
        {busy ? <span className="loading loading-spinner" /> : submitLabel}
      </button>
    </form>
  );
}
