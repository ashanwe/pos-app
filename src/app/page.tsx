"use client";
import { Button } from "@/components/ui/button";
import { Loader, LogOut, LayoutDashboard, LogIn } from "lucide-react";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gray-50">
        <Loader className="size-8 animate-spin text-gray-600" />
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/sign-in");
  };

  return (
    <SessionProvider>
      <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center gap-8 w-[400px] text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Welcome to <span className="text-indigo-600">MY POS</span> 🚀
          </h1>
          <p className="text-gray-500">
            {session
              ? `Hi, ${session.user?.username || "User"} 👋`
              : "Please sign in to continue"}
          </p>

          {session ? (
            <div className="flex flex-col gap-4 w-full">
              <Button asChild className="w-full py-6 text-lg">
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full py-6 text-lg"
                onClick={handleSignOut}>
                <LogOut className="mr-2 h-5 w-5" />
                Log Out
              </Button>
            </div>
          ) : (
            <Button asChild className="w-full py-6 text-lg">
              <Link href="/sign-in">
                <LogIn className="mr-2 h-5 w-5" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </SessionProvider>
  );
}
