import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const products = await Product.find().sort({ created_at: -1 }).limit(8);

    if (!products) {
      return NextResponse.json({ message: "No product found", status: 404 });
    }

    return NextResponse.json({
      message: "Get new product success!",
      status: 200,
      data: products,
    });
  } catch {
    return NextResponse.json({ message: "An error occurred", status: 500 });
  }
}
