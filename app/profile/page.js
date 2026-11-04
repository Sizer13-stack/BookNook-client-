"use client";
import PrivateRoute from "@/components/PrivateRoute";
import useTitle from "@/lib/useTitle";

export default function Profile() {
  useTitle("My Profile");
  return (
    <PrivateRoute>
      {(user) => (
        <div className="page max-w-md">
          <div className="card bg-base-100 border border-base-300 card-body items-center text-center gap-3">
            {user.image ? <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full object-cover" /> : null}
            <h1 className="h-section">{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </div>
      )}
    </PrivateRoute>
  );
}
