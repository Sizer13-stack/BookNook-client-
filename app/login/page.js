"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import useTitle from "@/lib/useTitle";

const getRedirect = () => new URLSearchParams(window.location.search).get("redirect") || "/";

export default function Login() {
  useTitle("Login");
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true); setError("");
    const { error } = await authClient.signIn.email({ email: f.get("email"), password: f.get("password") });
    setBusy(false);
    if (error) { setError(error.message || "Wrong email or password"); toast.error(error.message || "Wrong email or password"); return; }
    toast.success("Welcome back!");
    router.push(getRedirect());
  }
  const google = () => authClient.signIn.social({ provider: "google", callbackURL: getRedirect() });

  return (
    <div className="page max-w-md">
      <form onSubmit={submit} className="card bg-base-100 border border-base-300 card-body gap-4">
        <h1 className="h-section">Login to BookNook</h1>
        {error && <p className="text-error text-sm" role="alert">{error}</p>}
        <input name="email" type="email" required placeholder="Email" className="input input-bordered w-full" />
        <input name="password" type="password" required placeholder="Password" className="input input-bordered w-full" />
        <button type="button" onClick={() => toast("Password reset is coming soon")} className="link text-sm text-left">Forgot password?</button>
        <button disabled={busy} className="btn btn-primary">{busy ? <span className="loading loading-spinner" /> : "Login"}</button>
        <button type="button" onClick={google} className="btn btn-outline"><FcGoogle size={20} /> Continue with Google</button>
        <p className="text-sm">New here? <Link href="/register" className="link link-primary">Create an account</Link></p>
      </form>
    </div>
  );
}
