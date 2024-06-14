import connectDB from "@/app/config/connectDB";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  await connectDB();
  try {
    const { id, status } = await req.json();
    const user = await User.findByIdAndUpdate(id, {
      status: status === "active" ? "blocked" : "active",
    });
    if (user) {
      return NextResponse.json({
        message: "Block users Successfully",
        status: 200,
      });
    }
    return NextResponse.json({
      message: "Block users Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
