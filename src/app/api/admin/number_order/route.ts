import connectDB from "@/app/config/connectDB";
import TotalOrder from "@/app/models/numberOrder";
import { NextResponse } from "next/server";
export const revalidate = 0;

export async function GET() {
  await connectDB();
  try {
    const totalOrder = await TotalOrder.find();
    if (totalOrder) {
      return NextResponse.json({
        message: "Get product Successfully",
        status: 200,
        data: totalOrder,
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
