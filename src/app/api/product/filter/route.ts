import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const url = new URL(req.nextUrl);
    const categories = url.searchParams.get("categories");
    const size = url.searchParams.get("sizes");
    const query: any = {};

    if (categories) {
      const categoryArray = categories.split(" ");
      query.categories = { $in: categoryArray };
    }

    if (size) {
      const sizeArray = size.split(" ");
      query.sizes = {
        $elemMatch: { size: { $in: sizeArray }, amount: { $gt: 0 } },
      };
    }

    const products = await Product.find(query);

    return NextResponse.json({
      message: "Get discount success!",
      status: 200,
      data: products,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
