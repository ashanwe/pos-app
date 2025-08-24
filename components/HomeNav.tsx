import Link from "next/link";

export default function HomeNav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-blue-600">
        POS System
      </Link>

      {/* Sign In Button */}
      <Link
        href="/login"
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition">
        Sign In
      </Link>
    </nav>
  );
}
