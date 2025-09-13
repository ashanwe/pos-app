"use client";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loader className="size-6 mr-4 mt-4 animate-spin" />
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/sign-in");
  };
  return (
    <SessionProvider>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-col justify-center items-center gap-6">
          <h1 className="text-4xl font-bold">Welcome to MY POS!</h1>

          {session ? (
            <div className="flex gap-2">
              <Button className="py-5">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button className="py-5" onClick={() => handleSignOut()}>
                Log Out
              </Button>
            </div>
          ) : (
            <Button className="py-5">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </SessionProvider>
  );
}
