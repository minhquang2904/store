import connectDB from "@/app/config/connectDB";
import Inventory from "@/app/models/inventory";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const inventory: any = await Inventory.find();
    return NextResponse.json({
      message: "Get inventory Successfully",
      status: 200,
      data: inventory,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
