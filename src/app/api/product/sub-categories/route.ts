import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const url = new URL(req.url);
    const subCategories = url.searchParams.get("sub-categories")?.toLowerCase();
    const page: any = Number(url.searchParams.get("page"));
    const pageSize = 16;

    const dataFilter = {
      _id: 1,
      name: 1,
      subName: 1,
      categories: 1,
      discountedPrice: 1,
      discount: 1,
      files: 1,
      price: 1,
      quantity: 1,
    };

    if (!page || !subCategories) {
      return NextResponse.json({
        message: "No sub-categories found!",
        status: 404,
      });
    }

    const products = await Product.find(
      { sub_categories: subCategories },
      dataFilter
    )
      .sort({ created_at: -1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .exec();

    if (products.length === 0) {
      return NextResponse.json({
        message: "No sub-categories found!",
        status: 404,
      });
    }

    const total = await Product.countDocuments({
      sub_categories: subCategories,
    });

    return NextResponse.json({
      message: "Get sub-categories successfully!",
      status: 200,
      data: products,
      currentPage: page,
      totalPages: Math.ceil(total / 16),
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
