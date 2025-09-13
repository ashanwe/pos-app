"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import UserProfile from "./UserProfile";

interface NavbarProps {
  user?: { name: string; role: "shop_owner" | "cashier" };
}

export default function Navbar({ user }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 bg-white dark:bg-gray-900 shadow px-6 h-16 flex justify-between items-center">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            MyPOS
          </h1>
        </Link>
        {user && (
          <Link href={user.role === "cashier" ? "/cashier/pos" : "/dashboard"}>
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Orders
            </button>
          </Link>
        )}
      </div>

      <UserProfile />
    </nav>
  );
}
