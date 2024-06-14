import connectDB from "@/app/config/connectDB";
import Categories from "@/app/models/categories";
import SubCategories from "@/app/models/sub_categories";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const data: any = await User.find();
    if (data) {
      return NextResponse.json({
        message: "Get Categories Successfully",
        status: 200,
        data: data,
      });
    }
    return NextResponse.json({
      message: "Get Categories Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
