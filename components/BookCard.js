import Link from "next/link";
export default function BookCard({ book }) {
  return (
    <div className="card bg-base-100 border border-base-300 h-full">
      <figure className="h-64 bg-base-200"><img src={book.image} alt={book.title} className="h-full w-full object-cover" /></figure>
      <div className="card-body">
        <h3 className="card-title line-clamp-1">{book.title}</h3>
        <p className="text-sm opacity-80 line-clamp-1">by {book.author}</p>
        <div><span className="badge badge-outline">{book.category}</span></div>
        <div className="card-actions mt-auto pt-3">
          <Link href={`/books/${book._id}`} className="btn btn-primary btn-sm w-full">View Details</Link>
        </div>
      </div>
    </div>
  );
}
