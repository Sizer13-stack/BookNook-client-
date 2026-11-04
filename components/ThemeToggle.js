"use client";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const apply = (t) => { document.documentElement.setAttribute("data-theme", t); setDark(t === "nook-night"); };
  useEffect(() => {
    let t; try { t = localStorage.getItem("theme"); } catch {}
    apply(t || (matchMedia("(prefers-color-scheme: dark)").matches ? "nook-night" : "booknook"));
  }, []);
  const toggle = () => {
    const t = dark ? "booknook" : "nook-night";
    apply(t); try { localStorage.setItem("theme", t); } catch {}
  };
  return (
    <button onClick={toggle} className="btn btn-ghost btn-circle" aria-label="Switch theme">
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
