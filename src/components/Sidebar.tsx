"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdDashboard,
  MdInventory,
  MdShoppingCart,
  MdPeople,
  MdAssessment,
} from "react-icons/md";

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
}

export default function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links: SidebarLink[] = [
    { name: "Dashboard", href: "/dashboard", icon: MdDashboard },
    { name: "Products", href: "/products", icon: MdInventory },
    { name: "Sales", href: "/sales", icon: MdShoppingCart },
    { name: "Cashiers", href: "/cashiers", icon: MdPeople },
    { name: "Reports", href: "/reports", icon: MdAssessment },
  ];

  const filteredLinks = links.filter(link => {
    if (!link.roles) return true;
    return link.roles.includes(session?.user?.role || "");
  });

  return (
    <aside
      className={`${
        collapsed ? "w-18" : "w-64"
      } bg-primary text-white transition-all duration-300 flex flex-col fixed top-16 left-0 h-[calc(100vh-4rem)] z-40 shadow-xl`}>
      {/* Toggle */}
      <div className="p-4 border-b border-gray-800">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-end text-gray-400 hover:text-white transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? (
            <MdKeyboardDoubleArrowRight size="20" />
          ) : (
            <MdKeyboardDoubleArrowLeft size="20" />
          )}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredLinks.map(link => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
                    isActive
                      ? "bg-gray-800 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  title={collapsed ? link.name : undefined}>
                  <Icon size={20} className="flex-shrink-0" />
                  {!collapsed && (
                    <span className="font-medium">{link.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-500 text-center">MyPOS v1.0</div>
        </div>
      )}
    </aside>
  );
}
