import connectDB from "@/app/config/connectDB";
import TotalUser from "@/app/models/numberUser";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
export const revalidate = 0;

export async function GET() {
  await connectDB();
  try {
    const totalUser = await TotalUser.find({});

    if (totalUser.length == 0) {
      await TotalUser.findOneAndUpdate(
        { numberUserId: process.env.TOTAL_USER_ID },
        { totalUser: 0 },
        { upsert: true, new: true }
      );
      return NextResponse.json({
        message: "Get product Successfully",
        status: 200,
        data: { totalUser: 0 },
      });
    }

    return NextResponse.json({
      message: "Get product Successfully",
      status: 200,
      data: totalUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
