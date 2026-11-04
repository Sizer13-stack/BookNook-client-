"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const path = usePathname();
  const router = useRouter();
  const user = session?.user;
  const links = [["/", "Home"], ["/books", "All Books"], ...(user ? [["/add-book", "Add Book"], ["/my-books", "My Books"], ["/my-borrows", "My Borrows"]] : [])];
  const items = links.map(([href, label]) => (
    <li key={href}><Link href={href} className={path === href ? "font-semibold text-primary" : ""}>{label}</Link></li>
  ));
  async function logout() {
    await authClient.signOut();
    toast.success("You have been logged out");
    router.push("/");
  }
  return (
    <header className="bg-base-100 border-b border-base-300 sticky top-0 z-40">
      <div className="navbar max-w-6xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label="Open menu">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5h14M3 10h14M3 15h14" /></svg>
            </div>
            <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">{items}</ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex"><ul className="menu menu-horizontal gap-1">{items}</ul></div>
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {isPending ? null : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                {user.image ? <div className="w-10 rounded-full"><img src={user.image} alt={user.name} /></div>
                  : <div className="bg-primary text-primary-content w-10 rounded-full flex items-center justify-center">{user.name?.[0]}</div>}
              </div>
              <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow">
                <li className="menu-title text-base-content">{user.name}</li>
                <li><Link href="/profile">My Profile</Link></li>
                <li><button onClick={logout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
              <Link href="/register" className="btn btn-outline btn-primary btn-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
