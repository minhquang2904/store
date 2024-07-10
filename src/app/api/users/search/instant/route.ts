import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const url = new URL(req.nextUrl);
    const query: any = url.searchParams.get("query");
    const regex = new RegExp(query, "i");
    const product = await Product.find(
      {
        $or: [
          { name: { $regex: regex } },
          { categories: { $regex: regex } },
          { sub_categories: { $regex: regex } },
        ],
      },
      { files: 1, name: 1, price: 1, discount: 1, discountedPrice: 1 }
    ).sort({ soldCount: -1 });

    if (product) {
      return NextResponse.json({
        message: "Get discount success!",
        status: 200,
        data: product,
      });
    }
    return NextResponse.json({ message: "No product found!", status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
