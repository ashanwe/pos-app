"use client";

import Link from "next/link";
import UserProfile from "./UserProfile";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { MdShoppingCart } from "react-icons/md";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed w-full top-0 bg-white dark:bg-gray-900 shadow-sm border-b px-6 h-16 flex justify-between items-center z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600 transition-colors">
            MyPOS
          </h1>
        </Link>

        {/* Role Badge */}
        {session?.user?.role && (
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              session.user.role.toLowerCase() === "shopowner"
                ? "bg-purple-100 text-purple-800"
                : "bg-green-100 text-green-800"
            }`}>
            {session.user.role.replace("_", " ")}
          </span>
        )}
      </div>

      {/* Right: Profile */}
      <div className="flex items-center gap-5">
        {session?.user?.role === "cashier" && (
          <Link href="/sales" className="text-blue-500 flex gap-1 items-center">
            <MdShoppingCart />
            View Sales
          </Link>
        )}
        <UserProfile />
      </div>
    </nav>
  );
}
