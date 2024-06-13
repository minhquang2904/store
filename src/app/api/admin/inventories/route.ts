import connectDB from "@/app/config/connectDB";
import Inventories from "@/app/models/inventories";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const InventoriesCount = await Inventories.find();
    if (InventoriesCount) {
      return NextResponse.json({
        message: "Get product Successfully",
        status: 200,
        data: InventoriesCount,
      });
    }
    return NextResponse.json({
      message: "Get product Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
