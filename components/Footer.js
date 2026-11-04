import Link from "next/link";
import { FaXTwitter, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import Logo from "./Logo";

export default function Footer() {
  const social = [[FaXTwitter, "X", "https://x.com"], [FaFacebookF, "Facebook", "https://facebook.com"], [FaGithub, "GitHub", "https://github.com"], [FaLinkedinIn, "LinkedIn", "https://linkedin.com"]];
  return (
    <footer className="bg-neutral text-neutral-content mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <div className="[&_span]:text-neutral-content"><Logo /></div>
          <p className="text-sm opacity-80 max-w-xs">A small online library where you can add a book, borrow a book and return it.</p>
        </div>
        <div className="space-y-2 text-sm">
          <h3 className="font-semibold">Contact</h3>
          <p>zobayeramin13@gmail.com</p><p>+880 1612-018328</p><p>Dhaka, Bangladesh</p>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold">Follow us</h3>
          <div className="flex gap-3">
            {social.map(([Icon, name, url]) => (
              <Link key={name} href={url} target="_blank" rel="noreferrer" aria-label={name} className="btn btn-circle btn-sm btn-outline border-neutral-content/40 text-neutral-content"><Icon /></Link>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-xs opacity-70 border-t border-neutral-content/20 py-4">© {new Date().getFullYear()} BookNook. All rights reserved.</p>
    </footer>
  );
}
