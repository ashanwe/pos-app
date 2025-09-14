"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import {
  MdShoppingCart,
  MdInventory,
  MdPeople,
  MdTrendingUp,
} from "react-icons/md";

const Dashboard = () => {
  const { data: session } = useSession();

  // At this point, session is guaranteed to exist due to layout protection
  if (!session) {
    return null;
  }

  const isOwner =
    session.user?.role === "shop_owner" || session.user?.role === "shopowner";
  const displayName =
    `${session.user?.firstName || ""} ${session.user?.lastName || ""}`.trim() ||
    session.user?.username ||
    "User";

  // Mock data - replace with real data from your API
  const stats = [
    {
      title: "Today's Sales",
      value: "$1,234",
      description: "12 orders completed",
      icon: MdShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Products",
      value: "156",
      description: "23 low in stock",
      icon: MdInventory,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Cashiers",
      value: "4",
      description: "3 online now",
      icon: MdPeople,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {displayName}!
        </h1>
        <p className="text-blue-100">
          {isOwner
            ? "Here's an overview of your store's performance today."
            : "Ready to serve customers and process orders."}
        </p>
        <div className="mt-2 text-sm text-blue-200">
          Role: {session.user?.role} | Status: Active
        </div>
      </div> */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow gap-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="text-sm font-medium text-gray-900">
                New Cashier
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Add a new cashier
              </div>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="text-sm font-medium text-gray-900">
                Add Product
              </div>
              <div className="text-xs text-gray-500 mt-1">Add to inventory</div>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="text-sm font-medium text-gray-900">
                View Orders
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Check recent sales
              </div>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="text-sm font-medium text-gray-900">Reports</div>
              <div className="text-xs text-gray-500 mt-1">View analytics</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
