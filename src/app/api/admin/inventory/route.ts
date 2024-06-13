import connectDB from "@/app/config/connectDB";
import Inventories from "@/app/models/inventories";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const inventory: any = await Inventories.find();
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
