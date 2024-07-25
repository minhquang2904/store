import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const url = new URL(req.url);
    const promotions = url.searchParams.get("promotions")?.toLowerCase();
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

    if (!page || !promotions) {
      return NextResponse.json({
        message: "No promotions found!",
        status: 404,
      });
    }

    if (promotions === "discount") {
      const products = await Product.find({ discount: { $gt: 0 } }, dataFilter)
        .sort({ created_at: -1 })
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .exec();
      const total = await Product.countDocuments({ discount: { $gt: 0 } });

      return NextResponse.json({
        message: "Get discount successfully!",
        status: 200,
        data: products,
        currentPage: page,
        totalPages: Math.ceil(total / 16),
      });
    }

    if (promotions === "new-product") {
      const products = await Product.find({}, dataFilter)
        .sort({ created_at: -1 })
        .limit(20);

      const paginatedProducts = products.slice(
        (page - 1) * pageSize,
        page * pageSize
      );

      const totalPages = Math.ceil(products.length / pageSize);

      return NextResponse.json({
        message: "Get new product successfully!",
        status: 200,
        data: paginatedProducts,
        currentPage: page,
        totalPages: totalPages,
      });
    }

    return NextResponse.json({ message: "No promotions found!", status: 404 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
