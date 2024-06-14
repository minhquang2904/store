import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextRequest, NextResponse } from "next/server";
import { DeleteImage, UploadImage } from "@/app/lib/upload-image";
import Inventories from "@/app/models/inventories";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (id) {
      const productId = await Product.findById(id);
      if (productId) {
        return NextResponse.json({
          message: "Get product Successfully",
          status: 200,
          products: productId,
        });
      } else {
        return NextResponse.json({
          message: "Get product Failed",
          status: 400,
        });
      }
    }
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const products = await Product.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments();

    if (products) {
      return NextResponse.json({
        message: "Get product Successfully",
        status: 200,
        data: products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
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
