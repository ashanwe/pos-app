import Navbar from "../components/HomeNav";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-1 items-center justify-center px-6 py-16 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Simplify Your Business with Our POS System
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Manage sales, inventory, and customers with ease. Our POS solution
            is fast, reliable, and built to help your business grow.
          </p>

          {/* Call to Action */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/login"
              className="rounded-xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-blue-700 transition">
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
