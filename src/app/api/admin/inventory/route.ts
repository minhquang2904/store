import connectDB from "@/app/config/connectDB";
import Inventories from "@/app/models/inventories";
import { NextResponse } from "next/server";
export const revalidate = 0;

export async function GET() {
  await connectDB();
  try {
    const inventory = await Inventories.find();
    if (inventory) {
      return NextResponse.json({
        message: "Get product Successfully",
        status: 200,
        data: inventory,
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
