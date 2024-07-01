import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/connectDB";
import Order from "@/app/models/order";

export const revalidate = 0;
export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const order = await Order.find()
      .sort({ createdAt: -1 })
      .populate("items.productId", "files name");

    if (!order) {
      return NextResponse.json({ message: "Order not found", status: 404 });
    }

    return NextResponse.json({
      message: "Get List order",
      status: 200,
      data: order,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
