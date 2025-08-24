"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const role: "cashier" | "admin" = "cashier"; // <- normally from cookie/session

  // 👇 default collapsed if cashier, expanded if admin
  const [role, setRole] = useState<"cashier" | "admin">("cashier");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (role === "cashier") {
      setCollapsed(true); // Cashier → collapsed by default
    }
  }, [role]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={role} collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-64"
        }`}>
        {/* Navbar */}
        <div
          className={`fixed top-0 right-0 z-10 bg-white shadow transition-all duration-300 ${
            collapsed ? "left-16" : "left-64"
          }`}>
          <Navbar role={role} />
        </div>

        {/* Main content */}
        <main className="flex-1 mt-16 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
