"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import useTitle from "@/lib/useTitle";

function passwordError(p) {
  if (!/[A-Z]/.test(p)) return "Password needs at least one uppercase letter";
  if (!/[a-z]/.test(p)) return "Password needs at least one lowercase letter";
  if (p.length < 6) return "Password must be at least 6 characters";
  return "";
}

export default function Register() {
  useTitle("Register");
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const pErr = passwordError(f.get("password"));
    if (pErr) { setError(pErr); return; }
    setBusy(true); setError("");
    const { error } = await authClient.signUp.email({ name: f.get("name"), email: f.get("email"), image: f.get("photo"), password: f.get("password") });
    setBusy(false);
    if (error) { setError(error.message || "Could not register"); toast.error(error.message || "Could not register"); return; }
    toast.success("Account created. Please log in");
    router.push("/login");
  }

  return (
    <div className="page max-w-md">
      <form onSubmit={submit} className="card bg-base-100 border border-base-300 card-body gap-4">
        <h1 className="h-section">Create your account</h1>
        {error && <p className="text-error text-sm" role="alert">{error}</p>}
        <input name="name" required placeholder="Full name" className="input input-bordered w-full" />
        <input name="email" type="email" required placeholder="Email" className="input input-bordered w-full" />
        <input name="photo" type="url" required placeholder="Photo URL" className="input input-bordered w-full" />
        <input name="password" type="password" required placeholder="Password" className="input input-bordered w-full" />
        <button disabled={busy} className="btn btn-primary">{busy ? <span className="loading loading-spinner" /> : "Register"}</button>
        <button type="button" onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/" })} className="btn btn-outline"><FcGoogle size={20} /> Continue with Google</button>
        <p className="text-sm">Already have an account? <Link href="/login" className="link link-primary">Login</Link></p>
      </form>
    </div>
  );
}
