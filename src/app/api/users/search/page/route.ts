import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const url = new URL(req.nextUrl);
    const keyword: any = url.searchParams.get("keyword");
    const page: any = Number(url.searchParams.get("page"));
    const regex = new RegExp(keyword, "i");
    const product = await Product.find({
      $or: [
        { name: { $regex: regex } },
        { categories: { $regex: regex } },
        { sub_categories: { $regex: regex } },
      ],
    })
      .limit(16)
      .skip((page - 1) * 16)
      .exec();

    const total = await Product.countDocuments({
      $or: [
        { name: { $regex: regex } },
        { categories: { $regex: regex } },
        { sub_categories: { $regex: regex } },
      ],
    });

    if (product) {
      return NextResponse.json({
        message: "Get discount success!",
        status: 200,
        data: product,
        currentPage: page,
        totalPages: Math.ceil(total / 16),
      });
    }
    return NextResponse.json({ message: "No product found!", status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
