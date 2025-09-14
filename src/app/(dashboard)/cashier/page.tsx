"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  available: boolean;
};

type CartItem = MenuItem & { quantity: number };

const menuData: MenuItem[] = [
  {
    id: 1,
    name: "Butter Chicken",
    price: 12.64,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 2,
    name: "French Fries",
    price: 7.5,
    image:
      "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 3,
    name: "Roast Beef",
    price: 29,
    image:
      "https://plus.unsplash.com/premium_photo-1726863084475-e9169bb95b7a?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 4,
    name: "Sauerkraut",
    price: 11.55,
    image:
      "https://images.unsplash.com/photo-1695089028077-5e7949d238d3?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 5,
    name: "Beef Kebab",
    price: 14.95,
    image:
      "https://images.unsplash.com/photo-1659275798977-6eee03f687a2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: false,
  },
  {
    id: 6,
    name: "Fish and Chips",
    price: 23.05,
    image:
      "https://images.unsplash.com/photo-1579208030886-b937da0925dc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 7,
    name: "Wagyu Steak",
    price: 31.17,
    image:
      "https://plus.unsplash.com/premium_photo-1663012872761-33dd73e292cc?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 8,
    name: "Chicken Ramen",
    price: 17.7,
    image:
      "https://plus.unsplash.com/premium_photo-1664475934279-2631a25c42ce?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 9,
    name: "Butter Chicken",
    price: 12.64,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 10,
    name: "French Fries",
    price: 7.5,
    image:
      "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 11,
    name: "Roast Beef",
    price: 29,
    image:
      "https://plus.unsplash.com/premium_photo-1726863084475-e9169bb95b7a?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 12,
    name: "Sauerkraut",
    price: 11.55,
    image:
      "https://images.unsplash.com/photo-1695089028077-5e7949d238d3?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 13,
    name: "Beef Kebab",
    price: 14.95,
    image:
      "https://images.unsplash.com/photo-1659275798977-6eee03f687a2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: false,
  },
  {
    id: 14,
    name: "Fish and Chips",
    price: 23.05,
    image:
      "https://images.unsplash.com/photo-1579208030886-b937da0925dc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 15,
    name: "Wagyu Steak",
    price: 31.17,
    image:
      "https://plus.unsplash.com/premium_photo-1663012872761-33dd73e292cc?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 16,
    name: "Chicken Ramen",
    price: 17.7,
    image:
      "https://plus.unsplash.com/premium_photo-1664475934279-2631a25c42ce?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
];
const categories = ["All", ...new Set(menuData.map(item => item.name))];

export default function CashierDashboard() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: session } = useSession();

  // At this point, session is guaranteed to exist due to layout protection
  if (!session) {
    return null;
  }

  const addToCart = (item: MenuItem) => {
    setCart(prev =>
      prev.find(c => c.id === item.id)
        ? prev.map(c =>
            c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
          )
        : [...prev, { ...item, quantity: 1 }]
    );
  };

  const decreaseQty = (id: number) => {
    setCart(prev =>
      prev
        .map(c => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c))
        .filter(c => c.quantity > 0)
    );
  };

  const removeFromCart = (id: number) =>
    setCart(prev => prev.filter(c => c.id !== id));

  const subtotal = cart.reduce((a, i) => a + i.price * i.quantity, 0);
  const taxes = +(subtotal * 0.1).toFixed(2);
  const discount = subtotal >= 50 ? +(subtotal * 0.1).toFixed(2) : 0;
  const total = +(subtotal + taxes - discount).toFixed(2);

  const filteredMenu = menuData.filter(item => {
    const matchCat =
      selectedCategory === "All" || item.name === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="grid grid-cols-7 gap-6 h-full p-3">
      {/* Menu Section */}
      <div className="col-span-5 flex flex-col h-full">
        {/* Search & Categories */}
        <div className="flex-shrink-0 pb-2">
          <div className="relative w-full md:w-1/2 mb-3">
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border border-gray-600 focus:ring-gray-800 px-3 py-2 rounded-lg pr-9"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 hover:text-black">
                <IoClose className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1 rounded-full text-sm ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow"
                    : "bg-gray-200 hover:bg-gray-900 hover:text-white"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items (scrollable) */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 pr-2">
            {filteredMenu.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-3 flex flex-col">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg w-full h-28 object-cover"
                />
                <h3 className="mt-2 text-sm font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm">
                  ${item.price.toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart(item)}
                  disabled={!item.available}
                  className={`mt-2 w-full py-1 rounded-lg text-sm ${
                    item.available
                      ? "bg-primary text-white hover:bg-gray-800 dark:hover:bg-gray-700"
                      : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                  }`}>
                  {item.available ? "Add to Cart" : "Not Available"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Section (fixed) */}
      <div className="fixed right-6 w-2/7 col-span-2">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col h-[calc(100vh-6rem)]">
          <h2 className="text-lg font-bold mb-4 flex-shrink-0">
            🛒 Order Summary
          </h2>

          {/* Cart Items (scrollable) */}
          <div className="flex-1 overflow-y-auto min-h-0 pr-2 mb-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm">Cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300">
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300">
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-red-500 hover:text-red-700 flex-shrink-0">
                      <IoClose />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Totals + Checkout (Fixed at bottom) */}
          <div className="border-t pt-3 space-y-2 flex-shrink-0">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="mt-2 w-full py-2 rounded-lg text-white font-semibold transition">
              Confirm Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
