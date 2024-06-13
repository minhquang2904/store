import connectDB from "@/app/config/connectDB";
import Categories from "@/app/models/categories";
import Inventory from "@/app/models/inventory";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const inventory: any = await Inventory.find();
    if (inventory) {
      return NextResponse.json({
        message: "Get Inventory Successfully",
        status: 200,
        data: inventory,
      });
    }
    return NextResponse.json({
      message: "Get Inventory Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
