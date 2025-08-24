"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Navbar({ role }: { role: "cashier" | "admin" }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array to avoid re-adding listener unnecessarily

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-3 shadow">
      {/* Left side */}
      <div>
        {role === "cashier" ? (
          <></>
        ) : (
          <Link
            href="/dashboard/reports"
            className="text-gray-900 font-semibold">
            Reports
          </Link>
        )}
      </div>
      {/* Right side */}
      <div className="relative">
        {/* Profile button */}
        <button
          onClick={e => {
            e.stopPropagation(); // Prevent click from bubbling to document
            setOpen(!open);
          }}
          className="flex items-center gap-2 rounded-lg px-3 py-1 cursor-pointer">
          <div className="rounded-full bg-gray-200 h-8 w-8 flex items-center justify-center font-bold">
            U
          </div>
          <p className="hidden md:block">Ashan Weerakkodi</p>
        </button>

        {/* Dropdown menu */}
        {open && (
          <div
            ref={menuRef} // Attach ref to the dropdown menu
            className="absolute right-0 mt-2 w-40 py-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setOpen(false)} // Close menu on link click
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setOpen(false)} // Close menu on link click
            >
              Settings
            </Link>
            <button
              onClick={() => {
                setOpen(false); // Close menu on sign out
                alert("Sign out logic here");
              }}
              className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
