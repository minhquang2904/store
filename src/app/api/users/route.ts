import connectDB from "@/app/config/connectDB";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const searchParams = req.nextUrl.searchParams;
    const data: any = await User.find();

    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const user = await User.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments();

    if (data) {
      return NextResponse.json({
        message: "Get List User Successfully",
        status: 200,
        data: user,
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
