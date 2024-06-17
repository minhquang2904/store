import connectDB from "@/app/config/connectDB";
import User from "@/app/models/user";
import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/app/lib/jwt";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { token } = await req.json();
    const decode: any = await verifyToken(token);
    const data = decode?.payload;
    const user = await User.findById(data.id);

    if (user) {
      return NextResponse.json({
        message: "Authenticated successfully!",
        status: 200,
        data: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          phone: user.phone,
        },
      });
    }
    return NextResponse.json({
      message: "Authenticated Failed!",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
