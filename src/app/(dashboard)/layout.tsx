"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle authentication checking
  useEffect(() => {
    if (status === "loading") {
      return; // Still loading, don't do anything
    }

    if (status === "unauthenticated") {
      router.push("/sign-in");
      return;
    }

    if (status === "authenticated") {
      setIsAuthChecked(true);
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === "loading" || !isAuthChecked) {
    return (
      <div className="h-screen w-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (status === "unauthenticated" || !session) {
    return null;
  }

  // Determine if sidebar should be hidden
  const isCashier = session?.user?.role === "cashier";
  const showSidebar = !isCashier;

  return (
    <div className="h-screen w-screen bg-gray-50">
      {/* Navbar (fixed) */}
      <Navbar />

      {/* Main container */}
      <div className="flex pt-16 h-[calc(100vh-0rem)]">
        {/* Sidebar (only show if not cashier) */}
        {showSidebar && (
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        )}

        {/* Content */}
        <main
          className={`flex-1 overflow-auto p-6 transition-all duration-300 ${
            !showSidebar
              ? "ml-0" // No sidebar margin for cashier
              : collapsed
              ? "ml-16"
              : "ml-64"
          }`}>
          {children}
        </main>
      </div>
    </div>
  );
}
