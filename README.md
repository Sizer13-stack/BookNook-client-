# BookNook

A small online library: add a book, borrow a book, return a book.

**Live site:** https://your-booknook.vercel.app  (replace after deploying)

## Features
- Email/password and Google login with BetterAuth and the MongoDB adapter, with redirect back to the page you wanted
- Swiper hero, newest-first New Arrivals, and category browsing
- Add, edit and delete your own books, with cover upload to imgbb and a confirm modal
- Borrow for 7 days, return any time, with live copy counts and "Not Available" at zero
- One active borrow per book per reader, JWT-protected API
- Light and dark theme, responsive layout, per-page titles

Setup: copy `.env.example` to `.env.local`, then `npm i && npm run dev`.
