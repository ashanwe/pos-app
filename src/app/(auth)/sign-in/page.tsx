"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TriangleAlert } from "lucide-react";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if already logged in - WITH ROLE CHECK
  useEffect(() => {
    if (status === "authenticated" && session) {
      // Redirect based on role immediately when session is available
      if (session.user?.role === "cashier") {
        router.replace("/cashier");
      } else if (
        session.user?.role === "shopowner" ||
        session.user?.role === "shop_owner"
      ) {
        router.replace("/dashboard");
      } else {
        router.replace("/dashboard"); // default fallback
      }
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      setPending(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: username.trim(),
        password,
      });

      if (res?.ok && !res?.error) {
        toast.success("Login successful!");

        // Wait a bit for session to update, then get fresh session
        await new Promise(resolve => setTimeout(resolve, 300));
        const session = await getSession();

        if (session?.user?.role === "cashier") {
          router.replace("/cashier");
        } else if (
          session?.user?.role === "shopowner" ||
          session?.user?.role === "shop_owner"
        ) {
          router.replace("/dashboard");
        } else {
          router.replace("/dashboard"); // fallback
        }
      } else if (res?.status === 401 || res?.error === "CredentialsSignin") {
        setError("Invalid username or password");
        setPending(false);
      } else {
        setError("Something went wrong. Please try again.");
        setPending(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please check your connection.");
      setPending(false);
    }
  };

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render signin form if already authenticated
  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Sign In to MyPOS
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3 flex items-center gap-x-2">
              <TriangleAlert className="h-4 w-4 text-red-600" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <Input
                id="username"
                type="text"
                disabled={pending}
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="block w-full"
                autoComplete="username"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                disabled={pending}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="block w-full pr-10"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={pending}>
                {showPassword ? (
                  <FaEyeSlash className="h-4 w-4 text-gray-400" />
                ) : (
                  <FaEye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={pending}>
              {pending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6">
            <Separator className="my-4" />
            <p className="text-center text-sm text-gray-600">
              Don&lsquo;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
