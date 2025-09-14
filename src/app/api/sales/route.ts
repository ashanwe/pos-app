import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Sale from "@/models/Sale";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const cashierId = searchParams.get("cashierId");

    // If cashierId is provided, filter; otherwise fetch all
    const filter = cashierId ? { cashierId } : {};

    const sales = await Sale.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, sales });
  } catch (err: unknown) {
    console.error("Error fetching sales:", err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
