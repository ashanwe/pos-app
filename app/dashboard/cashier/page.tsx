"use client";
import { useState } from "react";

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

  // Add or increase quantity
  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existing = prevCart.find(c => c.id === item.id);
      if (existing) {
        return prevCart.map(c =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Decrease quantity (or remove if zero)
  const decreaseQty = (id: number) => {
    setCart(prevCart =>
      prevCart
        .map(c => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c))
        .filter(c => c.quantity > 0)
    );
  };

  // Remove item completely
  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(c => c.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxes = +(subtotal * 0.1).toFixed(2);
  const discount = subtotal >= 50 ? +(subtotal * 0.1).toFixed(2) : 0;
  const total = +(subtotal + taxes - discount).toFixed(2);

  // Filter items by category and search
  const filteredMenu = menuData.filter(item => {
    const matchesCategory =
      selectedCategory === "All" || item.name === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid grid-cols-6 gap-6">
      {/* Menu Section */}
      <div className="col-span-4">
        {/* 🔍 Search & Categories */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/2 border px-3 py-1 rounded-lg mb-3"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1 rounded-full text-sm ${
                  selectedCategory === cat
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
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
              <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(item)}
                disabled={!item.available}
                className={`mt-2 w-full py-1 rounded-lg text-sm ${
                  item.available
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}>
                {item.available ? "Add to Cart" : "Not Available"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="col-span-2">
        <div className="fixed top-16 mt-5 right-6 w-72 xl:w-96 bg-white rounded-xl shadow p-4 flex flex-col h-[85vh]">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>

          {/* Cart Items */}
          <ul className="flex-1 space-y-3 overflow-y-auto pr-2">
            {cart.length === 0 && (
              <p className="text-gray-500 text-sm">Cart is empty</p>
            )}

            {cart.map(item => (
              <li
                key={item.id}
                className="flex items-center gap-3 border-b pb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded">
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-2 py-1 bg-gray-200 rounded">
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 text-red-500 text-sm">
                  ✕
                </button>
              </li>
            ))}
          </ul>

          {/* Totals */}
          <div className="mt-4 border-t pt-2 space-y-1 text-sm">
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
          </div>

          <button className="mt-4 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}
