import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const head = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-head" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });

export const metadata = { title: "BookNook | Small Online Library", description: "Add a book, borrow a book, return a book." };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`} suppressHydrationWarning>
      <body className="bg-base-200 text-base-content min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
