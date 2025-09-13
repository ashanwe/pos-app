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
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { NextResponse } from "next/server";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setPending(false);
        toast.success(data.message);
        router.push("/sign-in");
      } else if (res.status === 400) {
        setError(data.message);
        setPending(false);
      } else if (res.status === 500) {
        setError(data.message);
        setPending(false);
      }

      return NextResponse.json({ message: "User created!" }, { status: 201 });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { message: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <Card className="md:h-auto w-[80%] sm:w-[420] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-medium">
            Sign up
          </CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Enter your details to Create account.
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="px-2 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="text"
                className=""
                disabled={pending}
                placeholder="First Name"
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
                required
              />
              <Input
                type="text"
                disabled={pending}
                placeholder="Last Name"
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </div>
            <Input
              type="text"
              disabled={pending}
              placeholder="Username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                disabled={pending}
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                disabled={pending}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={e =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <Button className="w-full" size="lg" disabled={pending}>
              Continue
            </Button>
          </form>
          <Separator />
          <p className="text-center text-sm mt-2 text-muted-foreground">
            Already have an account?
            <Link
              className="text-sky-700 ml-4 hover:underline cursor-pointer"
              href="sign-in">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
