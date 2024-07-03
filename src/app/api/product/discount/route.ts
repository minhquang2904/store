import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const url = new URL(req.nextUrl);
    const limit = parseInt(url.searchParams.get("limit") || "12");

    const products = await Product.find(
      { discount: { $gt: 0 } },
      {
        _id: 1,
        name: 1,
        subName: 1,
        categories: 1,
        discountedPrice: 1,
        discount: 1,
        files: 1,
        price: 1,
        quantity: 1,
      }
    ).limit(limit);

    if (products) {
      return NextResponse.json({
        message: "Get discount success!",
        status: 200,
        data: products,
      });
    }
    return NextResponse.json({ message: "No product found!", status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
