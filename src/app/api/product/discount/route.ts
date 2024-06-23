import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  await connectDB();
  try {
    const products = await Product.find(
      {},
      {
        _id: 1,
        name: 1,
        subName: 1,
        categories: 1,
        discountedPrice: 1,
        discount: 1,
        files: 1,
        price: 1,
      }
    );
    if (products) {
      const filterProduct = products.filter((item) => item.discount > 0);
      return NextResponse.json({
        message: "Get discount success!",
        status: 200,
        data: filterProduct,
      });
    }
    return NextResponse.json({ message: "No product found!", status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
