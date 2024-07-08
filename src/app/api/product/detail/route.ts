import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const url = new URL(req.nextUrl);
    const id = url.searchParams.get("id");
    const product = await Product.findById(id);

    if (product) {
      const related = await Product.find({
        sub_categories: product.sub_categories,
        _id: { $ne: product._id },
      })
        .sort({ soldCount: -1 })
        .limit(4);

      return NextResponse.json({
        message: "Get discount success!",
        status: 200,
        data: product,
        related: related,
      });
    }
    return NextResponse.json({ message: "No product found!", status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
