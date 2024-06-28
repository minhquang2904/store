import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextResponse, NextRequest } from "next/server";
// import { startSession } from "mongoose";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  // const session = await startSession();
  try {
    // session.startTransaction();
    const url = new URL(req.nextUrl);
    const id = url.searchParams.get("id");
    const product = await Product.findById(id);
    // await session.commitTransaction();
    // session.endSession();
    if (product) {
      return NextResponse.json({
        message: "Get discount success!",
        status: 200,
        data: product,
      });
    }
    return NextResponse.json({ message: "No product found!", status: 404 });
  } catch (error: any) {
    // await session.abortTransaction();
    // session.endSession();
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
