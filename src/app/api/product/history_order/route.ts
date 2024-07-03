import connectDB from "@/app/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import HistoryOrder from "@/app/models/history_order";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.nextUrl);
    const userId = url.searchParams.get("id");
    const historyOrder = await HistoryOrder.find({ userId })
      .sort({
        updatedAt: -1,
      })
      .populate("items.productId", "name files");

    return NextResponse.json({
      message: "Get history orders success!",
      status: 200,
      data: historyOrder,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
