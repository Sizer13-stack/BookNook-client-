"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Spinner from "./Spinner";

// Waits for the session check, so a reload never bounces a logged-in user to /login
export default function PrivateRoute({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (!isPending && !session) router.replace(`/login?redirect=${encodeURIComponent(path)}`);
  }, [isPending, session, path, router]);
  if (isPending || !session) return <Spinner />;
  return children(session.user);
}
