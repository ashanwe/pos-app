"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  role: "cashier" | "shopowner";
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export default function Sidebar({
  role,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const pathname = usePathname();
  // Different links based on role
  const links =
    role === "cashier"
      ? [
          { name: "Cashier", href: "/cashier" },
          { name: "Orders", href: "/orders" },
        ]
      : [
          { name: "Products", href: "/dashboard/products" },
          { name: "Orders", href: "/dashboard/orders" },
          { name: "Cashiers", href: "/dashboard/cashiers" },
          { name: "Reports", href: "/dashboard/reports" },
        ];

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-gray-900 text-white transition-all duration-300 flex flex-col
     fixed top-0 left-0 h-screen z-20`}>
      {/* Logo + Collapse Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <span className="font-bold">{collapsed ? "P" : "POS System"}</span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white">
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map(link => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded px-3 py-2 transition-colors ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}>
              {collapsed ? link.name.charAt(0) : link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
