"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-950 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            ⚽ World Cup Tracker
          </h1>

          <p className="text-blue-300 text-sm">
            FIFA World Cup 2026 • WIT
          </p>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 font-medium">
          <Link href="/">Dashboard</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/standings">Standings</Link>
          <Link href="/favorites">Favorites</Link>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? (
            <X size={30} />
          ) : (
            <Menu size={30} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-blue-900 border-t border-blue-700">
          <div className="flex flex-col p-4 gap-4">

            <Link
              href="/"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              href="/schedule"
              onClick={() => setOpen(false)}
            >
              Schedule
            </Link>

            <Link
              href="/standings"
              onClick={() => setOpen(false)}
            >
              Standings
            </Link>

            <Link
              href="/favorites"
              onClick={() => setOpen(false)}
            >
              Favorites
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}