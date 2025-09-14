import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Sale from "@/models/Sale";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Optional query filter by cashierId
    const { searchParams } = new URL(req.url);
    const cashierId = searchParams.get("cashierId");

    const filter = cashierId ? { cashierId } : {};
    const sales = await Sale.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, sales });
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
