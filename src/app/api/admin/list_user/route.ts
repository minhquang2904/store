import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const searchParams = req.nextUrl.searchParams;

    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const users = await Product.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments();

    if (users) {
      return NextResponse.json({
        message: "Get List User Successfully",
        status: 200,
        data: Product,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    }
    return NextResponse.json({
      message: "Get List User Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
