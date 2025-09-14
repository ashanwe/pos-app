"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { useSession } from "next-auth/react";

interface SaleItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Sale {
  _id: string;
  orderId: string;
  cashierId: string;
  cashier: string;
  cashierUsername: string; // updated field
  items: SaleItem[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const fetchSales = async () => {
    if (!session) return;
    setLoading(true);

    try {
      // If cashier, only fetch their sales
      const query =
        session.user.role === "cashier" ? `?cashierId=${session.user.id}` : "";

      const res = await fetch(`/api/sales${query}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch sales");
      setSales(data.sales);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Error fetching sales: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [session]);

  if (!session) return <p>Loading session...</p>;

  return (
    <div className="p-6">
      {session.user.role === "cashier" && (
        <Button className="mb-4">
          <Link href="/cashier" className="flex items-center gap-2">
            <IoReturnUpBackSharp />
            Back
          </Link>
        </Button>
      )}

      <h1 className="text-2xl font-bold mb-4">Sales</h1>

      {loading ? (
        <p>Loading...</p>
      ) : sales.length === 0 ? (
        <p>No sales found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Order ID</th>
              <th className="border p-2 text-left">Cashier ID</th>
              <th className="border p-2 text-left">Cashier</th>
              <th className="border p-2 text-left">Items</th>
              <th className="border p-2 text-left">Total</th>
              <th className="border p-2 text-left">Payment</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale._id} className="hover:bg-gray-50">
                <td className="border p-2">{sale.orderId}</td>
                <td className="border p-2">{sale.cashierId}</td>
                <td className="border p-2">{sale.cashier}</td>{" "}
                {/* display username */}
                <td className="border p-2">
                  {sale.items.map(item => (
                    <div key={item.productId}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="border p-2">${sale.totalAmount.toFixed(2)}</td>
                <td className="border p-2">{sale.paymentMethod}</td>
                <td className="border p-2">{sale.status}</td>
                <td className="border p-2">
                  {new Date(sale.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
