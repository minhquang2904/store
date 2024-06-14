import connectDB from "@/app/config/connectDB";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const url = req.nextUrl.clone();
    const searchParams = new URLSearchParams(url.searchParams);

    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const users = await User.find({})
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments();

    if (users) {
      return NextResponse.json({
        message: "Get users Successfully",
        status: 200,
        data: users,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        count: count,
        page: page,
        limit: limit,
      });
    }
    return NextResponse.json({
      message: "Get users Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
