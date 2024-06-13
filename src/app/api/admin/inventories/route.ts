import connectDB from "@/app/config/connectDB";
import Inventories from "@/app/models/inventories";
import Product from "@/app/models/product";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const inventoriesCount = await Inventories.find();
    const product = await Product.find();
    if (inventoriesCount) {
      return NextResponse.json({
        message: "Get product Successfully",
        status: 200,
        data: inventoriesCount,
        dataProduct: product,
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
